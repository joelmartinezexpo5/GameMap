import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Input, Label } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { JuegosAPI } from "../services/api";

export default function CrearJuego() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        genero: "",
        desarrollador: "",
        anio_lanzamiento: "",
        imagen_url: ""
    });

    // Si hay id, cargamos datos para editar
    useEffect(() => {
        if (id) {
            JuegosAPI.getById(id)
                .then(data => setFormData(data))
                .catch(err => console.error("Error cargando juego:", err));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("nombre", formData.nombre);
            formDataToSend.append("genero", formData.genero);
            formDataToSend.append("desarrollador", formData.desarrollador);
            formDataToSend.append("anio_lanzamiento", formData.anio_lanzamiento);

            if (formData.imagen) {
                formDataToSend.append("imagen", formData.imagen);
            }

            if (id) {
                await JuegosAPI.update(id, formDataToSend);
            } else {
                await JuegosAPI.create(formDataToSend);
            }

            navigate("/admin");
        } catch (error) {
            console.error("Error guardando juego:", error);
            alert("Hubo un error al guardar el juego");
        }
    };

    return (
        <Card className="bg-slate-900/50 border-purple-500/20">
            <CardHeader>
                <CardTitle className="text-white">
                    {id ? "Editar Juego" : "Crear Juego"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="nombre" className="text-white">Nombre</Label>
                        <Input id="nombre" value={formData.nombre} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="genero" className="text-white">Género</Label>
                        <Input id="genero" value={formData.genero} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="desarrollador" className="text-white">Desarrollador</Label>
                        <Input id="desarrollador" value={formData.desarrollador} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="anio_lanzamiento" className="text-white">Año de lanzamiento</Label>
                        <Input id="anio_lanzamiento" value={formData.anio_lanzamiento} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="imagen" className="text-white">Imagen</Label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })}
                            className="bg-slate-800 border-slate-700 text-white mt-2"
                        />
                    </div>
                    <Button type="submit" className="bg-purple-600 text-white">
                        {id ? "Actualizar" : "Crear"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
