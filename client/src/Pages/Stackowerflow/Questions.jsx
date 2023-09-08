import React, { useEffect } from "react";
import "./Questions.css";

import { useDispatch } from "react-redux";
import axios from "axios";
import { addAllQuestion } from "../../Store/reducers/dataSlice";
import { useQuery } from "react-query";
import AllQuestionDetail from "../../components/QuestionDetail/AllQuestionDetail";
import Loading from "../Loading/Loading";
function Questions() {
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery(
    "allquestion",
    () => axios.get(`http://localhost:8080/question`),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    dispatch(addAllQuestion(data?.data));
  }, [data]);

  return (
    <div className="question__page min-h-screen p-5">
      {isLoading ? <Loading /> : <AllQuestionDetail />}
    </div>
  );
}

export default Questions;
