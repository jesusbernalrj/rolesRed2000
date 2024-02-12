import { Permisos } from "../models/permisos/permisos";

export const permisos: Permisos[] = [
    {
      id: '1',
      name: "Ventas",
      permisos: ["Crear venta", "Editar venta", "Eliminar venta"]
    },
    {
      id: '2',
      name: "Productos",
      permisos: ["Crear producto", "Editar producto", "Eliminar producto"]
    },
    {
      id: '3',
      name: "Clientes",
      permisos: ["Crear cliente", "Editar cliente", "Eliminar cliente"]
    },
    {
      id: '4',
      name: "Empleados",
      permisos: ["Crear empleado", "Editar empleado", "Eliminar empleado"]
    },
    {
      id: '5',
      name: "Proveedores",
      permisos: ["Crear proveedor", "Editar proveedor", "Eliminar proveedor"]
    },
    {
      id: '6',
      name: "Salidas",
      permisos: ["Registrar salida", "Editar salida", "Eliminar salida"]
    },
    {
      id: '7',
      name: "Categorías",
      permisos: ["Crear categoría", "Editar categoría", "Eliminar categoría"]
    }
  ];

