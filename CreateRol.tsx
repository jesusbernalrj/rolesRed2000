import { useEffect, useState } from "react"
import ToggleCustom from "../../../components/ToggleCustom/ToggleCustom"
import './createrol.css'
import { IoKey } from "react-icons/io5";
import { permisos } from "../../../helpers/permisos";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooksRedux";
import { setPermisos, updatePermisos } from "../../../redux/slices/permisos/permisoSlice";
import { toast } from "sonner";
import { Permisos } from "../../../models/permisos/permisos";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes } from "../../../models/enum/Route";
const CreateRol = () => {
    const [rol, setRol] = useState<{[key:string]: boolean}>({})
    const params = useParams()
    const navigate = useNavigate()
    function generateUniqueId() {
      const timestamp = Date.now().toString(36);
      const randomString = Math.random().toString(36).substring(2, 8);
      return timestamp + randomString;
    }
    const [nombreRol, setNombreRol] = useState('')
    const [selectedElement, setSelectedElement] = useState('Ventas');
    const permisosAll = useAppSelector(state => state.permisos)
    const dispatch = useAppDispatch()
    const handleClick = () => {
      if(params.id){
        const permisosTrue = Object.entries(rol)
        .filter(([_key, value]) => value === true)
        .map(([key, _value]) => key);
        const nuevoPermisos = {name: nombreRol, permisos: permisosTrue, id: params.id}
        dispatch(updatePermisos(nuevoPermisos))
        toast.success('Rol actualizado correctamente')
        setRol({})
        setNombreRol('')
        return

      }
      if(nombreRol === '') return toast.error('El nombre del rol es requerido')
      if(nombreRol === 'Admin') return toast.error('El nombre del rol no puede ser Admin')
      const permisosTrue = Object.entries(rol)
    .filter(([_key, value]) => value === true)
    .map(([key, _value]) => key);
    if(permisosTrue.length === 0) return toast.error('Debe seleccionar al menos un permiso')
    
    const nuevoPermisos = {name: nombreRol, permisos: permisosTrue, id: generateUniqueId()}
    dispatch(setPermisos(nuevoPermisos))
    toast.success('Rol creado correctamente')
    setRol({})
    setNombreRol('')

    }
    useEffect(() => {
     if(params.id){
      console.log(params.id)
       const permisosRol = permisosAll.find((item: Permisos)=> item.id === params.id)
       if(permisosRol){
        console.log(permisosRol.name)
         setNombreRol(permisosRol.name)
         console.log(nombreRol)
         const permisosRolTrue = permisosRol.permisos.reduce((acc: any, item:any) => {
           return {...acc, [item]: true}
         }, {})
         setRol(permisosRolTrue)
       }
       return
     }
     setRol({})
     setNombreRol('')
    }, [])
    
const handleBackNavigate = () => {
  navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.CONFIGURACION_ROLES}`, {replace: true})

}
  return (
    <>
     <div>
        <h1>CreateRol</h1>
      </div>
      <div className="permiso-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 bg-light" style={{ height: "100vh" }}>
              <aside className="" style={{ overflow: "auto", height: "92vh" }}>
                <h1>
                  <IoKey /> Permisos
                </h1>
                <input
                  placeholder="Buscar permisos"
                  className="form-control mb-3"
                  style={{ position: "sticky", top: "0" }}
               
                />
                {permisos.map((elemento) => (
                  <div
                    key={elemento.name}
                    onClick={() => setSelectedElement(elemento.name)}
                  >
                    <h3
                      className={`border-t-0 border p-4 ${
                        selectedElement === elemento.name ? "selected" : ""
                      }`}
                      style={{ fontSize: "20px", cursor: "pointer" }}
                    >
                      {elemento.name}
                    </h3>
                  </div>
                ))}
              </aside>
            </div>
            <div className="col-9">
              <div className="d-flex align-items-center justify-between  bg-light">
                <h1>Crear Rol</h1>
                <button className="buttonPos" onClick={handleBackNavigate}>Back</button>
                </div>
                <input className="form-control" placeholder="Nombre de rol" 
                   value={nombreRol}
                   onChange={(e) => setNombreRol(e.target.value)}/>
              
              <div className="mt-3">
                {permisos.map((elemento) => (
                  <div
                    key={elemento.name}
                    className={ selectedElement === elemento.name ? 'd-flex flex-column' : ''}
                  >
                    {elemento.permisos.map((permiso, index) => (
                      <div key={index} className={selectedElement === elemento.name ? 'd-flex justify-content-between border-t-0 border p-4 mb-2' : ''}>
                      <h3 className="" style={{ fontSize: "20px" }}>
                        {selectedElement === elemento.name ? permiso : ""}
              
                      </h3>
                   { selectedElement === elemento.name  ?  
                   <ToggleCustom 
                   setToggle={setRol} 
                   id={permiso}
                   toggle={rol} /> : null}

                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-end mt-2">
              <button onClick={handleClick} className="inline-flex items-center justify-end rounded-md text-sm 
             font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
             focus-visible:ring-ring focus-visible:ring-offset-2 
                 hover:bg-primary/90 h-10 px-4 py-2 bg-green-500 text-white" style={{display: selectedElement === '' ? 'none' : ''}}>
        Agregar Rol
      </button>
      </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateRol