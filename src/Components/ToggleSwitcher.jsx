/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import {
  getAdultTopFilms,
  getTopAdultTVSeries,
} from "../redux/movie/movieOperations";

function SwitchExample({ type }) {
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsChecked(false);
  }, [type]);

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
    if (!isChecked) {
      if (type === "movie") {
        dispatch(getAdultTopFilms());
      } else dispatch(getTopAdultTVSeries());
    }
  };

  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="18+"
        checked={isChecked}
        onChange={handleSwitchChange}
      />
    </Form>
  );
}

export default SwitchExample;
