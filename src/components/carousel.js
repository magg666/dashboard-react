import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import GitHubTable from "./GitHubTable/GitHubTable";
import PanelHoc from "./Panel/Panel";


export const ControlledCarousel = props => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };
    const GitHubTableOnPanel = PanelHoc(GitHubTable);


    return (
        /* interval={10000} activeIndex={index} */
        <div  direction={direction} onSelect={handleSelect}  >
            {/*<Carousel.Item>*/}
                <GitHubTableOnPanel/>
            {/*</Carousel.Item>*/}
            <Carousel.Item>
                <div className="container">
                    <p>UUUUUU</p>
                    <p>UUUUUU</p>
                    <p>UUUUUU</p>
                    <p>UUUUUU</p>
                    <p>UUUUUU</p>
                    <p>UUUUUU</p>
                </div>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className="container">
                    <p>rrrrrrrrrrrrr</p>
                    <p>rrrrrrrrrrrrr</p>
                    <p>rrrrrrrrrrrrr</p>
                    <p>rrrrrrrrrrrrr</p>
                    <p>rrrrrrrrrrrrr</p>
                </div>

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </div>


    )
};


