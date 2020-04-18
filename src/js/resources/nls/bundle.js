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
            header: 'Master-Detail'
        },
        visualization: {
            header: 'Visualization'
        },
        actions: {
            create: 'Create',
            edit: 'Edit',
            delete: 'Delete'
        },
        labels: {
            menu: 'Menu',
            logout: 'Sign Off',
            search: 'Search'
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
                duplicate_location: 'Duplicate Location Id'
            },
            employees: {
                duplicate_employee: 'Duplicate Employee Id',
                not_exist_employee: 'Employee does not exist',
                not_exist_department: 'Department does not exist',
                email_not_formatted: 'Email is not correctly formatted',
                manager_employee_diff: 'EmployeeId cannot be same as ManagerId',
                manager_employee_valid: 'Employee with Id {manager} is not the manager of department {department}'
            }
        },
        attributes: {
            locations: {
                LocationId: 'Location Id',
                Address: 'Address',
                PostalCode: 'Postal Code',
                City: 'City',
                State: 'State',
                Country: 'Country',
            }
        }
    },
    es: true
});