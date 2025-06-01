import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import EmployeeForm from "./components/EmployeeForm";
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewedEmployee, setViewedEmployee] = useState(null);
<<<<<<< HEAD
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for fetch
  const [isManualRefresh, setIsManualRefresh] = useState(false); // Flag for manual refresh
  const toast = useRef(null);

  useEffect(() => {
    // Initial fetch without notification
=======
  const toast = useRef(null);

  useEffect(() => {
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = employees.filter((emp) =>
        Object.values(emp).some((value) =>
          String(value).toLowerCase().includes(lowercasedTerm)
        )
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  const fetchEmployees = async () => {
<<<<<<< HEAD
    if (loading) return; // Prevent multiple concurrent fetches
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/employees");
      console.log("Fetched employees:", response.data);
      setEmployees(response.data);
      setFilteredEmployees(response.data);
      // Reset selected states
      setSelectedEmployees([]);
      setSelectedRow(null);
      // Show notification only for manual refresh
      if (isManualRefresh) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Data refreshed successfully",
          life: 3000,
        });
        setIsManualRefresh(false); // Reset the flag after showing notification
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      if (isManualRefresh) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch employees",
          life: 3000,
        });
        setIsManualRefresh(false); // Reset the flag after showing notification
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (event) => {
    const rowData = event.data;
    setSelectedRow(rowData);
    if (!selectedEmployees.includes(rowData)) {
      setSelectedEmployees([rowData]);
=======
    try {
      const response = await axios.get("http://localhost:3000/api/employees");
      console.log("Fetched employees:", response.data); // Debug log
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch employees",
        life: 3000,
      });
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setDialogVisible(true);
  };

  const handleEdit = () => {
    if (selectedEmployees.length === 1) {
<<<<<<< HEAD
      console.log("Selected employee for edit:", selectedEmployees[0]);
=======
      console.log("Selected employee for edit:", selectedEmployees[0]); // Debug log
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
      setIsEditMode(true);
      setDialogVisible(true);
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please select exactly one employee to edit",
        life: 3000,
      });
    }
  };

  const handleView = () => {
    if (selectedEmployees.length === 1) {
      setViewedEmployee(selectedEmployees[0]);
      setViewDialogVisible(true);
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please select exactly one employee to view",
        life: 3000,
      });
    }
  };

  const handleDelete = async () => {
    if (selectedEmployees.length > 0) {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedEmployees.length} employee(s)?`
        )
      ) {
        try {
          for (const emp of selectedEmployees) {
            await axios.delete(
              `http://localhost:3000/api/employees/${emp.emp_id}`
            );
          }
          fetchEmployees();
          setSelectedEmployees([]);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: `${selectedEmployees.length} employee(s) deleted`,
            life: 3000,
          });
        } catch (error) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete employee(s)",
            life: 3000,
          });
        }
      }
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please select at least one employee to delete",
        life: 3000,
      });
    }
  };

  const handleDownload = () => {
    const csv = employees.map((emp) => Object.values(emp).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "employees.csv";
    link.click();
  };

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) return "N/A";
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

<<<<<<< HEAD
  const formatLastUpdated = (lastUpdated) => {
    if (!lastUpdated) return "N/A";
    const match = lastUpdated.match(/DateTime:([^ ]+)/);
    if (match) {
      const date = new Date(match[1]);
      return isNaN(date.getTime())
        ? "N/A"
        : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.toLocaleTimeString()}`;
    }
    return lastUpdated;
  };

=======
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
  const parseEmployeeDates = (employee) => {
    if (!employee) return employee;
    const dateFields = [
      "ctc_date",
      "birthday",
      "date_hired",
      "date_regularized",
      "date_separated",
      "contract_start",
      "contract_end",
    ];
    const parsed = { ...employee };
    dateFields.forEach((field) => {
      if (parsed[field]) {
        if (typeof parsed[field] === "string") {
          const d = new Date(parsed[field]);
          parsed[field] = isNaN(d.getTime()) ? null : d;
        } else if (!(parsed[field] instanceof Date)) {
          parsed[field] = null;
        }
      }
    });
    console.log("Parsed employee dates:", parsed);
    return parsed;
  };

<<<<<<< HEAD
  const onSave = async (updatedEmployee) => {
    await fetchEmployees();
    if (isEditMode && updatedEmployee) {
      const updatedSelected = selectedEmployees.map((emp) =>
        emp.emp_id === updatedEmployee.emp_id ? updatedEmployee : emp
      );
      setSelectedEmployees(updatedSelected);
      setSelectedRow(updatedEmployee);
    }
  };

  const handleRefresh = () => {
    setIsManualRefresh(true); // Set flag for manual refresh
    fetchEmployees();
  };

=======
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
  return (
    <div className="app-container">
      <Toast ref={toast} />
      <div className="table-wrapper">
        <h1 className="app-title">Manila Payroll Master File</h1>

        <div className="button-group">
          <Button
            label="Add"
            icon="pi pi-plus"
            className="p-button-success p-button-outlined"
            onClick={handleAdd}
          />
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="p-button-warning p-button-outlined"
            onClick={handleEdit}
          />
          <Button
            label="View"
            icon="pi pi-eye"
            className="p-button-info p-button-outlined"
            onClick={handleView}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger p-button-outlined"
            onClick={handleDelete}
            disabled={selectedEmployees.length === 0}
          />
          <Button
            label="Refresh"
            icon="pi pi-refresh"
            className="p-button-warning p-button-outlined"
<<<<<<< HEAD
            onClick={handleRefresh} // Use separate handler
            disabled={loading}
=======
            onClick={fetchEmployees}
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
          />
          <Button
            label="Download"
            icon="pi pi-download"
            className="p-button-secondary p-button-outlined"
            onClick={handleDownload}
          />
        </div>

        <div className="search-container">
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by any field..."
            className="search-input"
          />
        </div>

        <DataTable
          value={filteredEmployees}
          selectionMode="multiple"
          selection={selectedEmployees}
          onSelectionChange={(e) => setSelectedEmployees(e.value)}
<<<<<<< HEAD
          onRowClick={handleRowClick}
          rowClassName={(data) => (data === selectedRow ? "highlighted-row" : "")}
=======
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          className="p-datatable-sm custom-datatable"
          sortMode="multiple"
          removableSort
          scrollable
          scrollHeight="1000px"
<<<<<<< HEAD
          loading={loading || filteredEmployees.length === 0}
=======
          loading={filteredEmployees.length === 0}
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
          dataKey="emp_id"
        >
          <Column selectionMode="multiple" exportable={false} />
          <Column field="emp_id" header="Emp ID" sortable />
          <Column field="first_name" header="First Name" sortable />
          <Column field="middle_name" header="Middle Name" sortable />
          <Column field="last_name" header="Last Name" sortable />
          <Column field="suffix" header="Suffix" sortable />
          <Column field="address" header="Address" sortable />
          <Column field="city" header="City" sortable />
          <Column field="province" header="Province" sortable />
          <Column field="zip" header="Zip" sortable />
          <Column field="location" header="Location" sortable />
          <Column field="department" header="Department" sortable />
          <Column field="project" header="Project" sortable />
          <Column field="team" header="Team" sortable />
          <Column field="position" header="Position" sortable />
          <Column field="employment_type" header="Employment Type" sortable />
          <Column field="user_profile" header="User Profile" sortable />
          <Column field="manager" header="Manager" sortable />
          <Column field="vendor" header="Vendor" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="phone" header="Phone" sortable />
          <Column field="ctc_id" header="CTC ID" sortable />
          <Column field="ctc_place" header="CTC Place" sortable />
          <Column
            field="ctc_date"
            header="CTC Date"
            body={(rowData) => formatDate(rowData.ctc_date)}
            sortable
          />
          <Column field="ctc_amount" header="CTC Amount" sortable />
          <Column field="resident_cert" header="Resident Cert" sortable />
          <Column field="notes" header="Notes" sortable />
          <Column field="pay_frequency" header="Pay Frequency" sortable />
          <Column field="sex" header="Sex" sortable />
          <Column
            field="active"
            header="Active"
            body={(rowData) => (rowData.active ? "Yes" : "No")}
            sortable
          />
          <Column
            field="kasambahay"
            header="Kasambahay"
            body={(rowData) => (rowData.kasambahay ? "Yes" : "No")}
            sortable
          />
          <Column
            field="birthday"
            header="Birthday"
            body={(rowData) => formatDate(rowData.birthday)}
            sortable
          />
          <Column
            field="date_hired"
            header="Date Hired"
            body={(rowData) => formatDate(rowData.date_hired)}
            sortable
          />
          <Column
            field="date_regularized"
            header="Date Regularized"
            body={(rowData) => formatDate(rowData.date_regularized)}
            sortable
          />
          <Column
            field="date_separated"
            header="Date Separated"
            body={(rowData) => formatDate(rowData.date_separated)}
            sortable
          />
          <Column
            field="contract_start"
            header="Contract Start"
            body={(rowData) => formatDate(rowData.contract_start)}
            sortable
          />
          <Column
            field="contract_end"
            header="Contract End"
            body={(rowData) => formatDate(rowData.contract_end)}
            sortable
          />
          <Column
            field="minimum_wage_earner"
            header="Min Wage Earner"
            body={(rowData) => (rowData.minimum_wage_earner ? "Yes" : "No")}
            sortable
          />
          <Column field="monthly_rate" header="Monthly Rate" sortable />
          <Column field="tax_id" header="Tax ID" sortable />
          <Column field="sss_number" header="SSS Number" sortable />
          <Column field="philhealth_id" header="PhilHealth ID" sortable />
          <Column field="hdmf_id" header="HDMF ID" sortable />
          <Column field="hdmf_account" header="HDMF Account" sortable />
          <Column field="bank_name" header="Bank Name" sortable />
          <Column field="bank_account" header="Bank Account" sortable />
          <Column field="rate_type" header="Rate Type" sortable />
          <Column field="base_monthly_pay" header="Base Monthly Pay" sortable />
          <Column field="days_per_month" header="Days/Month" sortable />
          <Column field="hours_per_day" header="Hours/Day" sortable />
          <Column field="daily_rate" header="Daily Rate" sortable />
          <Column field="hourly_rate" header="Hourly Rate" sortable />
          <Column field="cost_of_living" header="Cost of Living" sortable />
          <Column
            field="representation_allowance"
            header="Rep Allowance"
            sortable
          />
          <Column
            field="housing_allowance"
            header="Housing Allowance"
            sortable
          />
          <Column
            field="transportation_allowance"
            header="Trans Allowance"
            sortable
          />
          <Column
            field="last_updated"
            header="Last Updated"
<<<<<<< HEAD
            body={(rowData) => formatLastUpdated(rowData.last_updated)}
=======
            body={(rowData) => rowData.last_updated || "N/A"}
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
            sortable
          />
        </DataTable>

        {selectedEmployees.length > 0 && (
          <div className="change-log">
            <h2 className="text-xl font-semibold">Change Log</h2>
            <p>
              {selectedEmployees[selectedEmployees.length - 1].last_updated ||
                "N/A"}
            </p>
          </div>
        )}

        <EmployeeForm
          visible={dialogVisible}
          onHide={() => setDialogVisible(false)}
          employee={
            isEditMode ? parseEmployeeDates(selectedEmployees[0]) : null
          }
<<<<<<< HEAD
          onSave={onSave}
=======
          onSave={fetchEmployees}
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
          isEditMode={isEditMode}
          toast={toast}
        />

        <Dialog
<<<<<<< HEAD
          header={`Employee Details - ${viewedEmployee ? `${viewedEmployee.first_name} ${viewedEmployee.last_name}` : ""}`}
=======
          header={`Employee Details - ${
            viewedEmployee
              ? `${viewedEmployee.first_name} ${viewedEmployee.last_name}`
              : ""
          }`}
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
          visible={viewDialogVisible}
          onHide={() => setViewDialogVisible(false)}
          className="employee-dialog"
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          modal
<<<<<<< HEAD
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          {viewedEmployee && (
            <div className="p-4">
              <div className="grid">
                {/* Personal Information */}
                <div className="col-12">
                  <Card title="Personal Information" className="mb-4">
                    <div className="grid grid-nogutter">
                      {[
                        { label: "Employee ID", value: viewedEmployee.emp_id },
                        { label: "First Name", value: viewedEmployee.first_name },
                        { label: "Middle Name", value: viewedEmployee.middle_name },
                        { label: "Last Name", value: viewedEmployee.last_name },
                        { label: "Suffix", value: viewedEmployee.suffix },
                        { label: "Sex", value: viewedEmployee.sex },
                        { label: "Birthday", value: formatDate(viewedEmployee.birthday) },
                        { label: "Email", value: viewedEmployee.email },
                        { label: "Phone", value: viewedEmployee.phone },
                        { label: "Address", value: viewedEmployee.address },
                        { label: "City", value: viewedEmployee.city },
                        { label: "Province", value: viewedEmployee.province },
                        { label: "Zip", value: viewedEmployee.zip },
                      ].map((item, index) => (
                        <div key={index} className="col-12 md:col-6 lg:col-4 p-2">
                          <div className="flex flex-col">
                            <span className="font-bold text-base text-gray-700">{item.label}:</span>
                            <span className="text-base text-gray-900">{item.value || "N/A"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Employment Details */}
                <div className="col-12">
                  <Card title="Employment Details" className="mb-4">
                    <div className="grid grid-nogutter">
                      {[
                        { label: "Location", value: viewedEmployee.location },
                        { label: "Department", value: viewedEmployee.department },
                        { label: "Project", value: viewedEmployee.project },
                        { label: "Team", value: viewedEmployee.team },
                        { label: "Position", value: viewedEmployee.position },
                        { label: "Employment Type", value: viewedEmployee.employment_type },
                        { label: "User Profile", value: viewedEmployee.user_profile },
                        { label: "Manager", value: viewedEmployee.manager },
                        { label: "Vendor", value: viewedEmployee.vendor },
                        { label: "Active", value: viewedEmployee.active ? "Yes" : "No", checkmark: true },
                      ].map((item, index) => (
                        <div key={index} className="col-12 md:col-6 lg:col-4 p-2">
                          <div className="flex flex-col">
                            <span className="font-bold text-base text-gray-700">{item.label}:</span>
                            <span className="text-base text-gray-900">
                              {item.checkmark
                                ? item.value === "Yes"
                                  ? "✓"
                                  : item.value || "N/A"
                                : item.value || "N/A"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Dates */}
                <div className="col-12">
                  <Card title="Dates" className="mb-4">
                    <div className="grid grid-nogutter">
                      {[
                        { label: "Date Hired", value: formatDate(viewedEmployee.date_hired) },
                        { label: "Date Regularized", value: formatDate(viewedEmployee.date_regularized) },
                        { label: "Date Separated", value: formatDate(viewedEmployee.date_separated) },
                        { label: "Contract Start", value: formatDate(viewedEmployee.contract_start) },
                        { label: "Contract End", value: formatDate(viewedEmployee.contract_end) },
                        { label: "Last Updated", value: formatLastUpdated(viewedEmployee.last_updated) },
                        { label: "Minimum Wage Earner", value: viewedEmployee.minimum_wage_earner ? "Yes" : "No", checkmark: true },
                        { label: "Kasambahay", value: viewedEmployee.kasambahay ? "Yes" : "No", checkmark: true },
                      ].map((item, index) => (
                        <div key={index} className="col-12 md:col-6 lg:col-4 p-2">
                          <div className="flex flex-col">
                            <span className="font-bold text-base text-gray-700">{item.label}:</span>
                            <span className="text-base text-gray-900">
                              {item.checkmark
                                ? item.value === "Yes"
                                  ? "✓"
                                  : item.value || "N/A"
                                : item.value || "N/A"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Compensation */}
                <div className="col-12">
                  <Card title="Compensation" className="mb-4">
                    <div className="grid grid-nogutter">
                      {[
                        { label: "Monthly Rate", value: viewedEmployee.monthly_rate },
                        { label: "Daily Rate", value: viewedEmployee.daily_rate },
                        { label: "Hourly Rate", value: viewedEmployee.hourly_rate },
                        { label: "Days/Month", value: viewedEmployee.days_per_month },
                        { label: "Hours/Day", value: viewedEmployee.hours_per_day },
                        { label: "Cost of Living", value: viewedEmployee.cost_of_living },
                        { label: "Rep Allowance", value: viewedEmployee.representation_allowance },
                        { label: "Housing Allowance", value: viewedEmployee.housing_allowance },
                        { label: "Trans Allowance", value: viewedEmployee.transportation_allowance },
                      ].map((item, index) => (
                        <div key={index} className="col-12 md:col-6 lg:col-4 p-2">
                          <div className="flex flex-col">
                            <span className="font-bold text-base text-gray-700">{item.label}:</span>
                            <span className="text-base text-gray-900">{item.value || "N/A"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Government IDs & Bank Info */}
                <div className="col-12">
                  <Card title="Government IDs & Bank Info">
                    <div className="grid grid-nogutter">
                      {[
                        { label: "Tax ID", value: viewedEmployee.tax_id },
                        { label: "SSS Number", value: viewedEmployee.sss_number },
                        { label: "PhilHealth ID", value: viewedEmployee.philhealth_id },
                        { label: "HDMF ID", value: viewedEmployee.hdmf_id },
                        { label: "HDMF Account", value: viewedEmployee.hdmf_account },
                        { label: "Bank Name", value: viewedEmployee.bank_name },
                        { label: "Bank Account", value: viewedEmployee.bank_account },
                        { label: "CTC ID", value: viewedEmployee.ctc_id },
                        { label: "CTC Place", value: viewedEmployee.ctc_place },
                        { label: "CTC Date", value: formatDate(viewedEmployee.ctc_date) },
                      ].map((item, index) => (
                        <div key={index} className="col-12 md:col-6 lg:col-4 p-2">
                          <div className="flex flex-col">
                            <span className="font-bold text-base text-gray-700">{item.label}:</span>
                            <span className="text-base text-gray-900">{item.value || "N/A"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
=======
        >
          {viewedEmployee && (
            <div className="grid">
              <div className="col-12 md:col-6">
                <Card title="Personal Information" className="mb-3">
                  <div className="grid">
                    <div className="col-6 ">
                      <p>
                        <strong>Employee ID:</strong>{" "}
                        {viewedEmployee.emp_id || "N/A"}
                      </p>
                      <p>
                        <strong>First Name:</strong>{" "}
                        {viewedEmployee.first_name || "N/A"}
                      </p>
                      <p>
                        <strong>Middle Name:</strong>{" "}
                        {viewedEmployee.middle_name || "N/A"}
                      </p>
                      <p>
                        <strong>Last Name:</strong>{" "}
                        {viewedEmployee.last_name || "N/A"}
                      </p>
                      <p>
                        <strong>Suffix:</strong>{" "}
                        {viewedEmployee.suffix || "N/A"}
                      </p>
                      <p>
                        <strong>Sex:</strong> {viewedEmployee.sex || "N/A"}
                      </p>
                      <p>
                        <strong>Birthday:</strong>{" "}
                        {formatDate(viewedEmployee.birthday)}
                      </p>
                    </div>
                    <div className="col-6">
                      <p>
                        <strong>Email:</strong> {viewedEmployee.email || "N/A"}
                      </p>
                      <p>
                        <strong>Phone:</strong> {viewedEmployee.phone || "N/A"}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {viewedEmployee.address || "N/A"}
                      </p>
                      <p>
                        <strong>City:</strong> {viewedEmployee.city || "N/A"}
                      </p>
                      <p>
                        <strong>Province:</strong>{" "}
                        {viewedEmployee.province || "N/A"}
                      </p>
                      <p>
                        <strong>Zip:</strong> {viewedEmployee.zip || "N/A"}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card title="Employment Details" className="mb-3">
                  <div className="grid">
                    <div className="col-6">
                      <p>
                        <strong>Location:</strong>{" "}
                        {viewedEmployee.location || "N/A"}
                      </p>
                      <p>
                        <strong>Department:</strong>{" "}
                        {viewedEmployee.department || "N/A"}
                      </p>
                      <p>
                        <strong>Project:</strong>{" "}
                        {viewedEmployee.project || "N/A"}
                      </p>
                      <p>
                        <strong>Team:</strong> {viewedEmployee.team || "N/A"}
                      </p>
                      <p>
                        <strong>Position:</strong>{" "}
                        {viewedEmployee.position || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <p>
                        <strong>Employment Type:</strong>{" "}
                        {viewedEmployee.employment_type || "N/A"}
                      </p>
                      <p>
                        <strong>User Profile:</strong>{" "}
                        {viewedEmployee.user_profile || "N/A"}
                      </p>
                      <p>
                        <strong>Manager:</strong>{" "}
                        {viewedEmployee.manager || "N/A"}
                      </p>
                      <p>
                        <strong>Vendor:</strong>{" "}
                        {viewedEmployee.vendor || "N/A"}
                      </p>
                      <p>
                        <strong>Active:</strong>{" "}
                        {viewedEmployee.active ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="col-12 md:col-6">
                <Card title="Dates" className="mb-3">
                  <div className="grid">
                    <div className="col-6">
                      <p>
                        <strong>Date Hired:</strong>{" "}
                        {formatDate(viewedEmployee.date_hired)}
                      </p>
                      <p>
                        <strong>Date Regularized:</strong>{" "}
                        {formatDate(viewedEmployee.date_regularized)}
                      </p>
                      <p>
                        <strong>Date Separated:</strong>{" "}
                        {formatDate(viewedEmployee.date_separated)}
                      </p>
                    </div>
                    <div className="col-6">
                      <p>
                        <strong>Contract Start:</strong>{" "}
                        {formatDate(viewedEmployee.contract_start)}
                      </p>
                      <p>
                        <strong>Contract End:</strong>{" "}
                        {formatDate(viewedEmployee.contract_end)}
                      </p>
                      <p>
                        <strong>Last Updated:</strong>{" "}
                        {viewedEmployee.last_updated || "N/A"}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card title="Compensation" className="mb-3">
                  <div className="grid">
                    <div className="col-6">
                      <p>
                        <strong>Monthly Rate:</strong>{" "}
                        {viewedEmployee.monthly_rate || "N/A"}
                      </p>
                      <p>
                        <strong>Daily Rate:</strong>{" "}
                        {viewedEmployee.daily_rate || "N/A"}
                      </p>
                      <p>
                        <strong>Hourly Rate:</strong>{" "}
                        {viewedEmployee.hourly_rate || "N/A"}
                      </p>
                      <p>
                        <strong>Days/Month:</strong>{" "}
                        {viewedEmployee.days_per_month || "N/A"}
                      </p>
                      <p>
                        <strong>Hours/Day:</strong>{" "}
                        {viewedEmployee.hours_per_day || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <p>
                        <strong>Cost of Living:</strong>{" "}
                        {viewedEmployee.cost_of_living || "N/A"}
                      </p>
                      <p>
                        <strong>Rep Allowance:</strong>{" "}
                        {viewedEmployee.representation_allowance || "N/A"}
                      </p>
                      <p>
                        <strong>Housing Allowance:</strong>{" "}
                        {viewedEmployee.housing_allowance || "N/A"}
                      </p>
                      <p>
                        <strong>Trans Allowance:</strong>{" "}
                        {viewedEmployee.transportation_allowance || "N/A"}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="col-12">
                <Card title="Government IDs & Bank Info">
                  <div className="grid">
                    <div className="col-6">
                      <p>
                        <strong>Tax ID:</strong>{" "}
                        {viewedEmployee.tax_id || "N/A"}
                      </p>
                      <p>
                        <strong>SSS Number:</strong>{" "}
                        {viewedEmployee.sss_number || "N/A"}
                      </p>
                      <p>
                        <strong>PhilHealth ID:</strong>{" "}
                        {viewedEmployee.philhealth_id || "N/A"}
                      </p>
                      <p>
                        <strong>HDMF ID:</strong>{" "}
                        {viewedEmployee.hdmf_id || "N/A"}
                      </p>
                      <p>
                        <strong>HDMF Account:</strong>{" "}
                        {viewedEmployee.hdmf_account || "N/A"}
                      </p>
                    </div>
                    <div className="col-6">
                      <p>
                        <strong>Bank Name:</strong>{" "}
                        {viewedEmployee.bank_name || "N/A"}
                      </p>
                      <p>
                        <strong>Bank Account:</strong>{" "}
                        {viewedEmployee.bank_account || "N/A"}
                      </p>
                      <p>
                        <strong>CTC ID:</strong>{" "}
                        {viewedEmployee.ctc_id || "N/A"}
                      </p>
                      <p>
                        <strong>CTC Place:</strong>{" "}
                        {viewedEmployee.ctc_place || "N/A"}
                      </p>
                      <p>
                        <strong>CTC Date:</strong>{" "}
                        {formatDate(viewedEmployee.ctc_date)}
                      </p>
                    </div>
                  </div>
                </Card>
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
              </div>
            </div>
          )}
        </Dialog>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
