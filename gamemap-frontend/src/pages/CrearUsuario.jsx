import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "../components/ui/Input";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { UsuariosAPI } from "../services/api";

export default function CrearUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: "",
        gamertag: "",
        email: "",
        password: "",
        role: "user",
        avatar: null,
    });

    // Si estamos editando, cargar datos del usuario
    useEffect(() => {
        if (id) {
            UsuariosAPI.getById(id)
                .then(data => {
                    setFormData({
                        full_name: data.full_name || "",
                        gamertag: data.gamertag || "",
                        email: data.email || "",
                        password: "",
                        role: data.role || "user",
                        avatar_url: null,
                    });
                })
                .catch(err => console.error("Error cargando usuario:", err));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("full_name", formData.full_name);
            formDataToSend.append("gamertag", formData.gamertag);
            formDataToSend.append("email", formData.email);
            if (!id) formDataToSend.append("password", formData.password);
            formDataToSend.append("role", formData.role);
            if (formData.avatar) {
                formDataToSend.append("avatar", formData.avatar);
            }

            console.log("Role enviado:", formData.role);
            console.log([...formDataToSend.entries()]);


            if (id) {
                await UsuariosAPI.update(id, formDataToSend);
            } else {
                await UsuariosAPI.create(formDataToSend);
            }

            navigate("/admin");
        } catch (error) {
            console.error("Error guardando usuario:", error);
            alert("Hubo un error al guardar el usuario");
        }
    };

    return (
        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm max-w-lg mx-auto mt-10">
            <CardHeader>
                <CardTitle className="text-white">
                    {id ? "Editar Usuario" : "Crear Usuario"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="full_name" className="text-slate-300">Nombre completo</Label>
                        <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} className="bg-slate-800 text-white" />
                    </div>
                    <div>
                        <Label htmlFor="gamertag" className="text-slate-300">Gamertag</Label>
                        <Input id="gamertag" name="gamertag" value={formData.gamertag} onChange={handleChange} className="bg-slate-800 text-white" />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-slate-300">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="bg-slate-800 text-white" />
                    </div>
                    {!id && (
                        <div>
                            <Label htmlFor="password" className="text-slate-300">Contraseña</Label>
                            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="bg-slate-800 text-white" />
                        </div>
                    )}
                    <div>
                        <Label htmlFor="role" className="text-slate-300">Rol</Label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} className="bg-slate-800 text-white w-full rounded-md p-2">
                            <option value="user">Usuario</option>
                            <option value="moderador">Moderador</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="avatar" className="text-slate-300">Avatar</Label>
                        <Input id="avatar" name="avatar" type="file" accept="image/*" onChange={handleFileChange} className="bg-slate-800 text-white" />
                    </div>
                    <Button type="submit" className="bg-purple-600 text-white w-full">
                        {id ? "Actualizar Usuario" : "Crear Usuario"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
