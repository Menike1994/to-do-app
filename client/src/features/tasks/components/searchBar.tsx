import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchTasksMutation } from "../TaskApi";
import { useAppDispatch } from "../../../app/hooks";
import { setTaskList } from "../TaskSlice";
import CreateTaskModal from "./forms/createTaskModal";
import AppApi from "../../../app/AppApi";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const [createFormOpen, setCreateModalOpen] = useState(false);

  const [search, { data: searchResult, isSuccess: isSearchSuccess }] =
    useSearchTasksMutation();

  const [form] = Form.useForm();

  const handleAddClick = () => {
    setCreateModalOpen(true);
  };

  const handleSearch = () => {
    const searchTerm = form.getFieldValue("searchTerm");
    console.log("search term ==> ", searchTerm);
    search(searchTerm);
  };

  useEffect(() => {
    if (searchResult && isSearchSuccess) {
      dispatch(setTaskList(searchResult));
    }
  }, [searchResult, isSearchSuccess]);

  const handleSearchChange = () => {
    const searchTerm = form.getFieldValue("searchTerm");
    if (searchTerm == "") {
      dispatch(AppApi.util.invalidateTags(["tasks"]));
    }
  };
  return (
    <>
      <Row className="justify-self-center content-center my-10">
        <Col className="p-2 content-center">
          <Form form={form} onFinish={handleSearch} layout="inline">
            <Form.Item
              name="searchTerm"
              rules={[
                { required: true, message: "please enter a search term" },
              ]}
            >
              <Input
                type="text"
                placeholder={"search"}
                onChange={handleSearchChange}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Search</Button>
            </Form.Item>
          </Form>
        </Col>
        <Col className="p-2">
          <Button
            onClick={handleAddClick}
            size="large"
            type="primary"
            style={{ minWidth: "100px" }}
          >
            Add Task
          </Button>
        </Col>
        <CreateTaskModal
          isOpen={createFormOpen}
          setIsOpen={setCreateModalOpen}
        />
      </Row>
    </>
  );
};

export default SearchBar;
