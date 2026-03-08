
import { useState } from "react";
import { signInDataTypes, UserDataTypes, verifyDataTypes } from "../types/UserDetails";
import { useNavigate } from "react-router-dom";

const useBackend = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
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

  const handleRegister = async (data: UserDataTypes) => {
    console.log('coming the register data..', data);
    try {
      if (!data.name || !data.email || !data.password) {
        setError('Please fill in all fields');
        return alert("please enter the all fields");
      } else {
        console.log("formdata", formData)
        const response = await fetch(`http://localhost:3006/signUp`, {
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
        const responseData = await fetch(`http://localhost:3006/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, otp: data.otp }),
        });
        console.log(responseData, "response comming")
        if (!responseData) {
          return "verification failed"
        } else {
          alert("successfully verified the email")
          navigate('/home');
          return "successfully verified"

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
        await fetch(`http://localhost:3006/signIn`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: formData.id }),
        });
        //  setUserValues([...userValues, { ...formData }]);

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

  const handleUpload = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }
    try {
      setUploading(true);
      const imageRes = await fetch(`http://localhost:3006/image?contentType=${encodeURIComponent(file.type)}`, {
        method: 'PUT'
      });

      if (!imageRes.ok) {
        throw new Error(`Server responded with ${imageRes.status}`);
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
        const s3Image = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}://${fileName}`;
        setFormData(prev => ({ ...prev, image: s3Image }));
        alert(`File uploaded successfully!`);
        return s3Image;
      }

    } catch (err) {
      console.error("Upload Error:", err);
      alert('Upload failed, check the console for details');
    } finally {
      setUploading(false);
      setFile(null);
    }
  }



  return {
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
    sendOtp
  }
}
export default useBackend;