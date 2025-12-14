import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Input, Label } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { PlataformasAPI } from "../services/api";

export default function CrearPlataforma() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        fabricante: "",
        anio_lanzamiento: "",
        imagen: null,
    });

    // Si hay id, cargamos datos para editar
    useEffect(() => {
        if (id) {
            PlataformasAPI.getById(id)
                .then(data => {
                    setFormData({
                        nombre: data.nombre || "",
                        fabricante: data.fabricante || "",
                        anio_lanzamiento: data.anio_lanzamiento || "",
                        imagen: null,
                    });
                })
                .catch(err => console.error("Error cargando plataforma:", err));
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
            formDataToSend.append("fabricante", formData.fabricante);
            formDataToSend.append("anio_lanzamiento", formData.anio_lanzamiento);

            if (formData.imagen) {
                formDataToSend.append("imagen", formData.imagen);
            }

            if (id) {
                await PlataformasAPI.update(id, formDataToSend);
            } else {
                await PlataformasAPI.create(formDataToSend);
            }

            navigate("/admin");
        } catch (error) {
            console.error("Error guardando plataforma:", error);
            alert("Hubo un error al guardar la plataforma");
        }
    };

    return (
        <Card className="bg-slate-900/50 border-purple-500/20">
            <CardHeader>
                <CardTitle className="text-white">
                    {id ? "Editar Plataforma" : "Crear Plataforma"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" value={formData.nombre} onChange={handleChange} />

                    <Label htmlFor="imagen">Imagen</Label>
                    <Input
                        id="imagen"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })}
                    />

                    <Button type="submit">{id ? "Actualizar" : "Crear"}</Button>
                </form>
            </CardContent>
        </Card>
    );
}
