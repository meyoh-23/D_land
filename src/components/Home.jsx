/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components'
import ImageSlider from './ImageSlider';
import Viewers from './Viewers';
import Recommends from './Recommends';
import NewDisney from './NewDisney';
import Trending from './Trending';
import Originals from './Originals';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "./firebase";
import { setMovies } from "../features/movies/moviesSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trending = [];

    useEffect(() => {
        //console.log("hello");
        db.collection("movies").onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
            //console.log(recommends);
            switch (doc.data().type) {
            case "recommend":
                recommends = [...recommends, { id: doc.id, ...doc.data() }];
                break;

            case "new":
                newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
                break;

            case "original":
                originals = [...originals, { id: doc.id, ...doc.data() }];
                break;

            case "trending":
                trending = [...trending, { id: doc.id, ...doc.data() }];
                break;
            }
        });

        dispatch(
            setMovies({
            recommend: recommends,
            newDisney: newDisneys,
            original: originals,
            trending: trending,
            })
        );
        });
    }, [userName]);
    
    return (
        <div>
            <Container>
                <ImageSlider/>
                <Viewers/>
                <Recommends/>
                <NewDisney/>
                <Originals/>
                <Trending/>
            </Container>
        </div>
    )
}

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);

    &:after {
        background: url("/images/home-background.png") center center / cover
        no-repeat fixed;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }
`;

export default Home;