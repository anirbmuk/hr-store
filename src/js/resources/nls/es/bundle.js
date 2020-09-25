define({
    login: {
        header: 'Login',
        email: 'Email',
        password: 'Password',
        autherror: 'Failed to authenticate to HR system'
    },
    locations: {
        header: 'Localizaciones'
    },
    departments: {
        header: 'Departamentos'
    },
    employees: {
        header: 'Empleados'
    },
    masterdetail: {
        header: 'Maestro y detalle',
        locdept_tab: 'Ubicaciones / Departamentos',
        empdirect_tab: 'Empleados / Directivos',
        locations: 'Ubicaciones',
        departments: 'Departamentos',
        employees: 'Empleados',
        directs: 'Directivos'
    },
    visualization: {
        header: 'Visualización'
    },
    actions: {
        create: 'Crear',
        edit: 'Editar',
        delete: 'Eliminar',
        save: 'Salvar',
        cancel: 'Cancelar'
    },
    labels: {
        menu: 'Menú',
        logout: 'Cerrar sesión',
        search: 'Buscar',
        count: 'Contar',
        jobs: 'Trabajos'
    },
    messages: {
        validation_error_header: 'Error de validacion',
        validation_error_text: 'Hay errores de validación en el formulario',
        operation_error_header: 'Operación inválida',
        operation_row_edit_error: 'Debes seleccionar una fila para editar',
        operation_row_delete_error: 'Debe seleccionar una fila para eliminar',
        action_error_header: 'Acción no autorizada',
        action_row_create_error: 'Crear operación no está permitido',
        action_row_edit_error: 'La operación de edición no está permitida',
        action_row_delete_error: 'La operación de eliminación no está permitida',
        save_success_header: 'Datos guardados',
        save_success_message: 'Se han guardado los cambios',
        locations: {
            duplicate_location: 'ID de ubicación duplicada',
            not_exist_location: 'La ubicación no existe'
        },
        departments: {
            duplicate_department: 'ID de departamento duplicado',
            not_exist_department: 'Departamento no existe',
        },
        employees: {
            duplicate_employee: 'ID de empleado duplicado',
            not_exist_employee: 'Empleado no existe',
            email_not_formatted: 'El correo electrónico no está formateado correctamente',
            manager_employee_diff: 'La identificación del empleado no puede ser la misma que la identificación del gerente',
            manager_employee_valid: 'El empleado con Id {manager} no es el gerente del departamento {department}',
            employees_with_job: 'Empleados con trabajo {jobId}',
            employees_min_max_rating: 'Rating should be between {min} and {max}'
        }
    },
    attributes: {
        locations: {
            LocationId: 'Id',
            Address: 'Habla a',
            PostalCode: 'Código postal',
            City: 'Ciudad',
            State: 'Provincia',
            Country: 'País',
        },
        departments: {
            DepartmentId: 'Id',
            DepartmentName: 'Nombre',
            ManagerId: 'Gerente',
            LocationId: 'Ubicación'
        },
        employees: {
            EmployeeId: 'Id',
            FirstName: 'Primer nombre',
            LastName: 'Apellido',
            Name: 'Nombre',
            Phone: 'Teléfono',
            HireDate: 'Contratado en',
            Email: 'Email',
            JobId: 'Trabajo',
            Salary: 'Salario',
            Commission: 'Comisión',
            ManagerId: 'Gerente',
            DepartmentId: 'Departamento',
            EmployeeRating: 'La tasación'
        }
    }
});