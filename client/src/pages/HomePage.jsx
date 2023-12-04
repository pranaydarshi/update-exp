import React, { useEffect } from "react";
import { Form, Input, Modal, Select, Table, message } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import { DatePicker } from "antd";
import moment from "moment";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setshowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [alltrans, setalltrans] = useState([]);
  const [frequency, setfrequency] = useState("7");
  const [selectdate, setselectdate] = useState([]);
  const [type, settype] = useState("all");
  const [viewdata, setviewdata] = useState("table");
  const [editable, seteditable] = useState(null);

  //table data

  // useEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = await JSON.parse(localStorage.getItem("user"));
        // setloading(true);
        const res = await axios.post("/transaction/get-transaction", {
          userid: user._id,
          frequency,
          selectdate,
          type,
        });
        // setloading(false);
        setalltrans(res.data);

        console.log(res.data);
      } catch (err) {
        console.log(err);
        message.error("Ftech Issue with transaction");
      }
    };
    getAllTransactions();
  }, [frequency, selectdate, type]);

  //Columns Label
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            className="mx-2"
            onClick={() => {
              seteditable(record);
              setshowModal(true);
            }}
          ></EditOutlined>
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          ></DeleteOutlined>
        </div>
      ),
    },
  ];

  //Delete Handler
  const handleDelete = async (record) => {
    try {
      await axios.post("/transaction/delete-trasaction", {
        transactionId: record._id,
      });
      message.success("Transaction Deleted");
    } catch (err) {
      console.log(err);
      message.error("Unable to delete");
    }
  };

  //Form Handling
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user._id);
      setloading(true);

      if (editable) {
        await axios.post("/transaction/edit-trasaction", {
          payload: {
            userid: user._id,
            amount: values.amount,
            type: values.type,
            category: values.category,
            reference: values.reference,
            descripton: values.descripton,
            date: values.date,
          },
          transactionId: editable._id,
        });
        setloading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/transaction/add-trasaction", {
          userid: user._id,
          amount: values.amount,
          type: values.type,
          category: values.category,
          reference: values.reference,
          descripton: values.descripton,
          date: values.date,
        });
        setloading(false);
        message.success("Transaction Added Successfully");
      }
      setshowModal(false);
      seteditable(null);
    } catch (err) {
      setloading(false);
      message.error("Falied To add Trasaction");
    }
  };

  return (
    <Layout>
      {loading && <Spinner></Spinner>}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setfrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Yeark</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectdate}
              onChange={(values) => setselectdate(values)}
            ></RangePicker>
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => settype(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {/* {frequency === "custom" && (
            <RangePicker
              value={selectdate}
              onChange={(values) => setselectdate(values)}
            ></RangePicker>
          )} */}
        </div>
        <div className="icon-container">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewdata === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setviewdata("table")}
          ></UnorderedListOutlined>
          <AreaChartOutlined
            className={`mx-2 ${
              viewdata === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setviewdata("analytics")}
          ></AreaChartOutlined>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setshowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewdata === "table" ? (
          <Table columns={columns} dataSource={alltrans}></Table>
        ) : (
          <Analytics alltrans={alltrans}></Analytics>
        )}
      </div>
      <Modal
        title={editable ? "Edit Trasaction" : "Add Trasaction"}
        open={showModal}
        onCancel={() => setshowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text"></Input>
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="Bills">Bills</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date"></Input>
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text"></Input>
          </Form.Item>
          <Form.Item label="Descripton" name="descripton">
            <Input type="text"></Input>
          </Form.Item>
          <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-primary">SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
