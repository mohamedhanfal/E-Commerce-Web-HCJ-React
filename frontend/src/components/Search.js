import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  useNavigate();
  const navigate = useNavigate();
  const searchHandler = () => {
    navigate("/search?keyword=" + keyword);
  };

  return (
    <div className="input-group">
      <input
        type="text"
        id="search_field"
        onChange={(e) => {
          setKeyword(e.target.value);
          //   navigate("/search?keyword=" + e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchHandler();
          }
        }}
        className="form-control"
        placeholder="Enter Product Name ..."
      />
      <div className="input-group-append">
        <button onClick={searchHandler} id="search_btn" className="btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
