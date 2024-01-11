'use client'
import React from "react";
import ReactSlider from "react-slider"
import "./style.css";

function RangeInput({value, setValue}) {
  

  return (
    <>
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="custom-thumb"
      trackClassName="custom-track"
      defaultValue={value}
      onChange={(e) => setValue(e)}
      value={value}
      ariaLabel={['Lower thumb', 'Upper thumb']}
      ariaValuetext={state => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => <div {...props}>
        <p className="range-slider-text">${state.valueNow}</p>
      </div>}
      pearling
      minDistance={50}
      min={100}
      max={1000}
    />
    
    </>
  );
}

export default RangeInput;
