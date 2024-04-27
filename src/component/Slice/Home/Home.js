import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { checkSignalStatus } from "../Slice";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [currentSideIndex, setCurrentSideIndex] = useState(0);
  const [countdown, setCountdown] = useState([30, 65, 100, 135]); // Initial countdown values for each signal
  const signalData = useSelector((state) => state.signal.signalData);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const sides = ["right", "bottom", "left", "top"];
  const oppositeSides = ["left", "top", "right", "bottom"];
  const carCollection = ["car1", "car2", "car3", "car4", "car5", "car6"];
  const carsPosition = [0, 60, 120, 300, 360, 420];
  // console.log(oppositeSides[activeIndex]);
  const handleSignalStart = (side, color, oppositeSide) => {
    dispatch(
      checkSignalStatus({
        signalSide: side,
        signalValue: color,
        otherSideValue: "red",
        signalCount: countdown,
        oppositedirection: oppositeSide,
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Update countdown values for each signal
      const updatedCountdown = countdown.map((count) => {
        if (count > 0) {
          return count - 1;
        } else {
          if (count === -5) {
            return (count = 134);
          } else {
            return count - 1;
          }
        }
      });
      const yellowSignalIndex = updatedCountdown.indexOf(0);
      const greenSignalIndex = updatedCountdown.indexOf(134);
      setCountdown(updatedCountdown);

      // Advance to the next side
      const nextSideIndex = (currentSideIndex + 1) % sides.length;
      setCurrentSideIndex(nextSideIndex);
      if (yellowSignalIndex != -1) {
        if (yellowSignalIndex < sides.length) {
          handleSignalStart(
            sides[yellowSignalIndex],
            "yellow",
            oppositeSides[yellowSignalIndex]
          );
          setActiveIndex(yellowSignalIndex);
        } else {
          handleSignalStart(sides[0], "yellow", oppositeSides[0]);
          setActiveIndex(0);
        }
      }
      if (greenSignalIndex != -1) {
        if (greenSignalIndex < sides.length - 1) {
          handleSignalStart(
            sides[greenSignalIndex + 1],
            "green",
            oppositeSides[greenSignalIndex + 1]
          );
          setActiveIndex(greenSignalIndex + 1);
        } else {
          handleSignalStart(sides[0], "green", oppositeSides[0]);
          setActiveIndex(0);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);
  const carRefs = useRef([]);

  // Inside the component
  useEffect(() => {
    carRefs.current = carRefs.current.slice(0, carCollection.length);
    console.log(carRefs.current[0].style.top);
  }, [carCollection]);
  return (
    <>
      <div className="main-parent-div">
        <div className="main-signal-div">
          {signalData.map((item, index) => (
            <div className={`signal ${item.signalPosition}`} key={item.id}>
              <div className={`signalCount text_${item.value}`}>
                {countdown[index]}
              </div>
              <div
                className={`light ${item.value === "red" ? "red" : ""}`}
              ></div>
              <div
                className={`light ${item.value === "green" ? "green" : ""}`}
              ></div>
              <div
                className={`light ${item.value === "yellow" ? "yellow" : ""}`}
              ></div>
            </div>
          ))}
        </div>

        {signalData &&
          signalData.map((item) => {
            return (
              <div className={`roadSide ${item.signalPosition}`}>
                <div className="go">
                  <img
                    className={`direction-arrow ${
                      item.signalPosition === sides[activeIndex] ? "main" : ""
                    }`}
                    src={`./img/${item.value}-arrow.png`}
                    alt="arrow"
                  />
                  {carCollection &&
                    carCollection.map((imgItem, index) => {
                      return (
                        <img
                          ref={(element) => (carRefs.current[index] = element)}
                          className={`car-show ${imgItem} ${
                            item.signalPosition === sides[activeIndex]
                              ? "running"
                              : ""
                          }`}
                          style={{ top: `${carsPosition[index]}px` }}
                          src={`./img/${imgItem}.png`}
                          alt="car-img"
                        />
                      );
                    })}
                </div>
                <div className="come">
                  <img
                    className={`direction-arrow ${
                      item.signalPosition === oppositeSides[activeIndex]
                        ? "opposite"
                        : ""
                    }`}
                    src={`./img/${
                      item.signalPosition === oppositeSides[activeIndex]
                        ? `${item.oppositeValue}-arrow.png`
                        : "red-arrow.png"
                    }`}
                    alt="arrow"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
