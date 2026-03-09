import useBackend from "../hook/useBackend";


const HomePage = () => {
    const { currentUser, setFile, handleUpdate, file, uploading } = useBackend()
    console.log("image comming", currentUser)
    return (
        <div>
            <h2>Welcome to home page</h2>
            <h5>user name: {currentUser.name}</h5>
            <h5>email: {currentUser.email}</h5>
            <p>profile image:</p>
            <img src={currentUser.image} alt="profile" style={{ width: '100px' }} />
            <div>
                <p>edit:</p>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <button
                    onClick={() => handleUpdate(file)}
                    disabled={!file || uploading}
                >
                    {uploading ? 'Updating...' : 'Update'}
                </button>

            </div>
        </div>
    )
}
export default HomePage;