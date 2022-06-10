export default function Range({
  name, id, label, onChange, min, max, steps,
}) {
  // const rangeSlider = document.getElementById(id);
  // const rangeBullet = document.getElementById(`${id}-rs-bullet`);

  // function showSliderValue() {
  //   rangeBullet.innerHTML = rangeSlider.value;
  //   const bulletPosition = rangeSlider.value / rangeSlider.max;
  //   rangeBullet.style.left = `${bulletPosition * 578} px`;
  // }

  // rangeSlider.addEventListener('input', showSliderValue, false);
  return (
    <div className="mb-3 d-flex">
      <div className="range-label">
        <label className="form-label me-2" htmlFor={id}>
          {label}
        </label>
      </div>
      <div className="d-flex justify-content-center w-100">
        <div className="range-slider">
          {/* <span id={`${id}-rs-bullet`} className="rs-label">
            0
          </span> */}
          <input
            type="range"
            className="form-range rs-range"
            name={name}
            id={id}
            min={min}
            max={max}
            step={steps}
            defaultValue={0}
            onChange={onChange}
          />
          <div className="box-minmax">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
