
import { createContext, useContext, useEffect, useState } from "react";
import { signInDataTypes, UserDataTypes, verifyDataTypes } from "../types/UserDetails";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://13.233.101.116:3006";

const BackendContext = createContext<any>(null);
export const BackendProvider = ({ children }: { children: React.ReactNode }) => {

  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(()=>{
     const savedUser = localStorage.getItem("user");
     return savedUser ? JSON.parse(savedUser) : null;
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [userValues, setUserValues] = useState<UserDataTypes[]>([])
  const [formData, setFormData] = useState<UserDataTypes>({
    id: '',
    name: '',
    email: '',
    password: '',
    image: '',
  })
  const [verifyForm, setVerifyForm] = useState<verifyDataTypes>({
    email: '',
    otp: ''
  });
  

useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");
  if (savedUser && savedToken) {
    setCurrentUser(JSON.parse(savedUser));
  }
}, []);


  const handleRegister = async (data: UserDataTypes) => {
    console.log('coming the register data..', data);
    try {
      if (!data.name || !data.email || !data.password) {
        setError('Please fill in all fields');
        return alert("please enter the all fields");
      } else {
        console.log("formdata", formData)
        const response = await fetch(`${API_URL}/signUp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          setUserValues([...userValues, data]);
          alert("you have sended verification link please click for otp")
        }
      }
    } catch {
      alert("the user details not added to the db")
    }
  };

  const handleVerification = async (data: verifyDataTypes) => {
    console.log('coming the register data..', data);
    try {
      if (!data.email || !data.otp) {
        return alert("please enter the all fields");
      } else {
        const responseData = await fetch(`${API_URL}/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, otp: data.otp }),
        });
        console.log(responseData, "response comming")
        if (responseData.ok) {
          const result = await responseData.json();

          setCurrentUser(result.otpCheck.dataValues || result.otpCheck);
          navigate('/home');
        } else {
          return "verification failed"
        }
      }
    } catch {
      alert("email and verification code check once")
    }
  };

  const handleLogin = async (data: signInDataTypes) => {
    try {
      if (!data.email || !data.password) {
        setError('Please fill in all fields');
        return alert("please enter the all fields");
      } else {
        console.log("formdata", formData)
        const response = await fetch(`${API_URL}/signIn`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
      });
        if (response.ok) {
          const responseData = await response.json();
          localStorage.setItem('token', responseData.accessToken);
          localStorage.setItem('user', JSON.stringify(responseData));
          setCurrentUser(responseData)
          navigate('/home');
        }else{
         return alert(`failed to the signin`);
        }
        //  setUserValues([...userValues, {...formData}]);
      }
    } catch {
      alert("the email and password not matched to user")
    }

  }

  const sendOtp = async (data: UserDataTypes) => {
    handleRegister(data)
    navigate('/verify');
  }

  const AWS_REGION = "ap-south-1"
  const S3_BUCKET_NAME = "source-bucket-9odh6y"
  const S3_BUCKET_NAME2 = "dest-bucket-9odh6y"

  const handleUpload = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }
    try {
      setUploading(true);
      const imageRes = await fetch(`${API_URL}/image?contentType=${encodeURIComponent(file.type)}`, {
        method: 'PUT'
      });

      if (!imageRes.ok) {
        console.log("image presigned url not generated")
      }
      const { uploadURL, fileName } = await imageRes.json();
      const upload = await fetch(uploadURL, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!upload.ok) {
        alert('Upload to S3 failed!');
        return;
      } else {

        const s3Image = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${fileName}`;
        const resizeImg = `https://${S3_BUCKET_NAME2}.s3.${AWS_REGION}.amazonaws.com/${fileName}`;
        setFormData(prev => ({ ...prev, image: s3Image }));
        alert(`Successfully file uploaded`);
        console.log(resizeImg, "resized image comming")
      }

    } catch (err) {
      console.error("errorr occured..", err);
      alert('upload failed check once');
    } finally {
      setUploading(false);
      setFile(null);
    }
  }


  const handleUpdate = async (selectedFile: File) => {
    if (!selectedFile || !currentUser) return;

    try {
      setUploading(true);
      const res = await fetch(`${API_URL}/image?contentType=${encodeURIComponent(selectedFile.type)}`, {
        method: 'PUT'
      });
      const { uploadURL, fileName } = await res.json();

      await fetch(uploadURL, {
        method: 'PUT',
        headers: { 'Content-Type': selectedFile.type },
        body: selectedFile,
      });
      const updateImgRes = await fetch(`${API_URL}/newImage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email,
          newImage: fileName
        }),
      });

      if (updateImgRes.ok) {
        const data = await updateImgRes.json();
        setCurrentUser((prev: any) => ({ ...prev, image: data.imageUrl }));
        alert("Profile picture updated!");
      }
    } catch (err) {
      console.error("Upload Error:", err);
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/');
  };


  return (
    <BackendContext.Provider
      value={{
        handleRegister,
        setFormData,
        formData,
        error,
        setError,
        verifyForm,
        setVerifyForm,
        handleVerification,
        handleLogin,
        handleUpload,
        uploading,
        file,
        setFile,
        currentUser,
        sendOtp,
        handleUpdate,
        handleLogout,
        
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};

const useBackend = () => {
  const context = useContext(BackendContext);
  if (!context) {
    throw new Error("use backend within the backendProvider");
  }
  return context;
};
export default useBackend;

