define({
    root: {
        login: {
            header: 'Login',
            email: 'Email',
            password: 'Password',
            autherror: 'Failed to authenticate to HR system'
        },
        locations: {
            header: 'Locations'
        },
        departments: {
            header: 'Departments'
        },
        employees: {
            header: 'Employees'
        },
        masterdetail: {
            header: 'Master-Detail',
            locdept_tab: 'Locations - Departments',
            empdirect_tab: 'Employees - Directs',
            locations: 'Locations',
            departments: 'Departments',
            employees: 'Employees',
            directs: 'Directs'
        },
        visualization: {
            header: 'Visualization'
        },
        actions: {
            create: 'Create',
            edit: 'Edit',
            delete: 'Delete',
            save: 'Save',
            cancel: 'Cancel'
        },
        labels: {
            menu: 'Menu',
            logout: 'Sign Off',
            search: 'Search',
            count: 'Count',
            jobs: 'Jobs'
        },
        messages: {
            validation_error_header: 'Validation error',
            validation_error_text: 'There are validation errors on the form',
            operation_error_header: 'Invalid operation',
            operation_row_edit_error: 'You must select a row to edit',
            operation_row_delete_error: 'You must select a row to delete',
            action_error_header: 'Unauthorized action',
            action_row_create_error: 'Create operation is not allowed',
            action_row_edit_error: 'Edit operation is not allowed',
            action_row_delete_error: 'Delete operation is not allowed',
            save_success_header: 'Data saved',
            save_success_message: 'Your changes have been saved',
            locations: {
                duplicate_location: 'Duplicate Location Id',
                not_exist_location: 'Location does not exist'
            },
            departments: {
                duplicate_department: 'Duplicate Department Id',
                not_exist_department: 'Department does not exist',
            },
            employees: {
                duplicate_employee: 'Duplicate Employee Id',
                not_exist_employee: 'Employee does not exist',
                email_not_formatted: 'Email is not correctly formatted',
                manager_employee_diff: 'EmployeeId cannot be same as ManagerId',
                manager_employee_valid: 'Employee with Id {manager} is not the manager of department {department}',
                employees_with_job: 'Employees with job {jobId}',
                employees_min_max_rating: 'Rating should be between {min} and {max}'
            }
        },
        attributes: {
            locations: {
                LocationId: 'Id',
                Address: 'Address',
                PostalCode: 'Postal Code',
                City: 'City',
                State: 'State',
                Country: 'Country',
            },
            departments: {
                DepartmentId: 'Id',
                DepartmentName: 'Name',
                ManagerId: 'Manager',
                LocationId: 'Location'
            },
            employees: {
                EmployeeId: 'Id',
                FirstName: 'First Name',
                LastName: 'Last Name',
                Name: 'Name',
                Phone: 'Phone',
                HireDate: 'Hire Date',
                Email: 'Email',
                JobId: 'Job',
                Salary: 'Salary',
                Commission: 'Commission',
                ManagerId: 'Manager',
                DepartmentId: 'Department',
                EmployeeRating: 'Rating'
            }
        }
    },
    es: true
});