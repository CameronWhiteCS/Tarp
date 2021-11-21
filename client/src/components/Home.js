import { useHistory } from "react-router";

const Home = () => {


    const history = useHistory();
    history.push('/messages')

    return <>HOME</>
}

export default Home;