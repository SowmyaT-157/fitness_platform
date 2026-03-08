import useBackend from "../hook/useBackend";



const HomePage = () => {
    const { currentUser } = useBackend()
    console.log("image comming", currentUser)
    return (
        <div>
            <h2>Welcome to home page</h2>
            <h5>user name: {currentUser.name}</h5>
            <h5>email: {currentUser.email}</h5>
            <p>profile image:</p>
            <img src={currentUser.image} alt="profile" style={{ width: '100px' }} />
        </div>
    )
}
export default HomePage;