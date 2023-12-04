import React from "react";
import { Progress } from "antd";

const Analytics = ({ alltrans }) => {
  //category.
  const categories = [
    "salary",
    "tip",
    "project",
    "Bills",
    "movie",
    "food",
    "medical",
    "fee",
    "tax",
  ];

  //Total Transactions
  const totaltrans = alltrans.length;
  const totalincometrans = alltrans.filter((trans) => trans.type === "income");
  const totalexpensetrans = alltrans.filter(
    (trans) => trans.type === "expense"
  );
  const totalincomeper = (totalincometrans.length / totaltrans) * 100;
  const totalexpenseper = (totalexpensetrans.length / totaltrans) * 100;

  //Total Turnover
  const totalturnover = alltrans.reduce((acc, trans) => acc + trans.amount, 0);
  const totalincometurnover = alltrans
    .filter((trans) => trans.type === "income")
    .reduce((acc, trans) => acc + trans.amount, 0);
  const totalexpenseturnover = alltrans
    .filter((trans) => trans.type === "expense")
    .reduce((acc, trans) => acc + trans.amount, 0);
  const totalincometurnoverper = (totalincometurnover / totalturnover) * 100;
  const totalexpenseturnoverper = (totalexpenseturnover / totalturnover) * 100;

  return (
    <>
      {console.log(totaltrans)}
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Transaction : {totaltrans}</div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalincometrans.length}
              </h5>
              <h5 className="text-danger">
                Expense: {totalexpensetrans.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalincomeper.toFixed(0)}
                ></Progress>
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalexpenseper.toFixed(0)}
                ></Progress>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="card">
            <div className="card-header">Total Turnover : {totalturnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalincometurnover}</h5>
              <h5 className="text-danger">Expense: {totalexpenseturnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalincometurnoverper.toFixed(0)}
                ></Progress>
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className=""
                  percent={totalexpenseturnoverper.toFixed(0)}
                ></Progress>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-3">
        <div className="col-md-4">
          <h4>Categorywise Income</h4>
          {categories.map((category) => {
            const amount = alltrans
              .filter(
                (trans) =>
                  trans.type === "income" && trans.category === category
              )
              .reduce((acc, trans) => acc + trans.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      className="m-3"
                      percent={((amount / totalincometurnover) * 100).toFixed(
                        0
                      )}
                    ></Progress>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-4">
          <h4>Categorywise Expense</h4>
          {categories.map((category) => {
            const amount = alltrans
              .filter(
                (trans) =>
                  trans.type === "expense" && trans.category === category
              )
              .reduce((acc, trans) => acc + trans.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      className="m-3"
                      percent={((amount / totalexpenseturnover) * 100).toFixed(
                        0
                      )}
                    ></Progress>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
