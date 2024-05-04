import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { checkSignalStatus, carsStatus } from "../Slice";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [currentSideIndex, setCurrentSideIndex] = useState(0);
  const [countdown, setCountdown] = useState([30, 65, 100, 135]); // Initial countdown values for each signal
  const signalData = useSelector((state) => state.signal.signalData);
  const carsData = useSelector((state) => state.signal.carsData);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const sides = ["right", "bottom", "left", "top"];
  const oppositeSides = ["left", "top", "right", "bottom"];
  const carsPosition = [0, 60, 120, 180];
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
  const updateCarPositions = () => {
    const updatedCarsData = carsData.map((sideData, index) => {
      if (
        signalData[index].value === "green" ||
        signalData[index].value === "yellow"
      ) {
        // Update positions for green and yellow signals
        return {
          ...sideData,
          position: sideData.position.map((pos) => {
            let newPos = parseInt(pos) - 10;
            if (newPos < -500) {
              newPos = 500;
            } else if (newPos > -150) {
              return `${newPos}px`;
            }
            return `${newPos}px`;
          }),
        };
      }
      return sideData; // Return unchanged data if not green/yellow
    });

    // Reset positions to original for red signals
    const resetCarsData = updatedCarsData.map((sideData, index) => {
      if (signalData[index].value === "red") {
        return {
          ...sideData,
          position: sideData.position.map((pos, index) => {
            let newPos = parseInt(pos) - 10; // Decrease by 1 pixel for smoother movement
            if (newPos < -10) {
              if (newPos < -500) {
                newPos = 500;
              } else {
                return `${newPos}px`;
              }
            } else if (newPos < carsPosition[index]) {
              newPos = carsPosition[index];
            }
            return `${newPos}px`;
          }),
        };
      }
      return sideData; // Return unchanged data if not red
    });

    // Dispatch the updated carsData for all sides
    dispatch(carsStatus({ othersData: resetCarsData }));
  };

  useEffect(() => {
    const interval = setInterval(updateCarPositions, 200);
    return () => clearInterval(interval);
  }, [carsData, activeIndex]);
  return (
    <>
      <button
        className="light-dark-btn"
        style={{ backgroundColor: darkMode ? "red" : "green" }}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className={`main-parent-div ${darkMode ? "dark" : ""}`}>
        <div className="main-signal-div">
          <div className="street-light">
            <div className="street-center">
              <div className="pole-1">
                <div className="light light1"></div>
              </div>
              <div className="pole-2">
                <div className="light light2"></div>
              </div>
              <div className="pole-3">
                <div className="light light3"></div>
              </div>
              <div className="pole-4">
                <div className="light light4"></div>
              </div>
            </div>
          </div>
          {signalData.map((item, index) => (
            <div className={`signal ${item.signalPosition}`} key={item.id}>
              <div className={`signalCount text_${item.value}`}>
                {Math.abs(countdown[index])}
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

        {carsData.map((sideData, index) => (
          <div key={sideData.id} className={`roadSide ${sideData.id}`}>
            <div className="go">
              <img
                className={`direction-arrow ${
                  signalData[index].signalPosition === sides[activeIndex]
                    ? "main"
                    : ""
                }`}
                src={
                  process.env.PUBLIC_URL +
                  `/img/${signalData[index].value}-arrow.png`
                }
                alt="arrow"
              />
              {sideData.cars.map((car, index) => (
                <img
                  key={car}
                  className={`car-show ${car} ${
                    sideData.id === sides[activeIndex] ? "running" : ""
                  } ${sideData.position[index] === "500px" ? "hide" : ""}`}
                  style={{ top: `${sideData.position[index]}` }}
                  src={process.env.PUBLIC_URL + `/img/${car}.png`}
                  alt="car-img"
                />
              ))}
            </div>
            <div className="come">
              {/* Render opposite direction arrow */}
              <img
                className={`direction-arrow ${
                  sideData.id === oppositeSides[activeIndex] ? "opposite" : ""
                }`}
                src={
                  process.env.PUBLIC_URL +
                  `/img/${
                    sideData.id === oppositeSides[activeIndex]
                      ? `${signalData[index].oppositeValue}-arrow.png`
                      : "red-arrow.png"
                  }`
                }
                alt="arrow"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
