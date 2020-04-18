define({
    location: 'Localizaciones',
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
        header: 'Maestro y detalle'
    },
    visualization: {
        header: 'Visualización'
    },
    actions: {
        create: 'Crear',
        edit: 'Editar',
        delete: 'Eliminar'
    },
    labels: {
        menu: 'Menú',
        logout: 'Cerrar sesión',
        search: 'Buscar'
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
            duplicate_location: 'ID de ubicación duplicada'
        },
        employees: {
            duplicate_employee: 'ID de empleado duplicado',
            not_exist_employee: 'Empleado no existe',
            not_exist_department: 'Departamento no existe',
            email_not_formatted: 'El correo electrónico no está formateado correctamente',
            manager_employee_diff: 'La identificación del empleado no puede ser la misma que la identificación del gerente',
            manager_employee_valid: 'El empleado con Id {manager} no es el gerente del departamento {department}'
        }
    },
    attributes: {
        locations: {
            LocationId: 'Id de Ubicación',
            Address: 'Habla a',
            PostalCode: 'Código postal',
            City: 'Ciudad',
            State: 'Provincia',
            Country: 'País',
        }
    }
});