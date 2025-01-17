




package Component.Ventas;

import java.io.File;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConfig;
import Servisofts.SPGConect;

public class PaqueteVentaUsuario {
    public static final String COMPONENT = "paqueteVentaUsuario";

    public PaqueteVentaUsuario(JSONObject data, SSSessionAbstract session) {
        switch (data.getString("type")) {
            case "getAll":
                getAll(data, session);
            break;
            case "getByKey":
                getByKey(data, session);
                break;
            case "registro":
                registro(data, session);
            break;
            case "eliminar":
                eliminar(data, session);
            break;
            case "editar":
                editar(data, session);
            break;
            case "subirFoto":
                subirFoto(data, session);
            break;
        }
    }
    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_all('paquete_venta_usuario','key_usuario','"+obj.getString("key_usuario")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getVentaDia(String key_usuario, String fecha_on) {
        try {
            String consulta =  "select get_venta_dia('"+key_usuario+"', '"+fecha_on+"') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('paquete_venta_usuario','"+obj.getString("key")+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getByKey(String key) {
        try {
            String consulta =  "select get_by_key('paquete_venta_usuario','"+key+"') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject paquete_venta_usuario = obj.getJSONObject("data");
            paquete_venta_usuario.put("key",UUID.randomUUID().toString());
            paquete_venta_usuario.put("fecha_on",fecha_on);
            paquete_venta_usuario.put("estado",1);
            SPGConect.insertArray("paquete_venta_usuario", new JSONArray().put(paquete_venta_usuario));
            obj.put("data", paquete_venta_usuario);
            obj.put("estado", "exito");

            SSServerAbstract.sendAllServer(obj.toString());

            JSONObject cliente = obj.getJSONObject("cliente");

            JSONObject mail = new JSONObject();
            mail.put("__MAIL__",cliente.getString("Correo"));
            mail.put("__FECHA__",paquete_venta_usuario.getString("fecha_inicio"));
            mail.put("__ID_PEDIDO__",paquete_venta_usuario.getString("key"));
            mail.put("__CI__",cliente.getString("CI"));
            mail.put("__PAQUETE__",paquete_venta_usuario.getString("nombre_paquete"));
            mail.put("__RENOVACION__",paquete_venta_usuario.getString("fecha_fin"));
            mail.put("__MONTO__",paquete_venta_usuario.get("monto").toString());
            mail.put("__KEY_USUARIO_CLIENTE__",paquete_venta_usuario.getString("key_usuario")+"?fecha="+new Date().toString());
            mail.put("__KEY_PAQUETE_venta__",paquete_venta_usuario.getString("key_paquete_venta")+"?fecha="+new Date().toString());

            //new Email(Email.TIPO_RECIBO, mail);

        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }

    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject paquete_venta_usuario = obj.getJSONObject("data");
            SPGConect.editObject("paquete_venta_usuario", paquete_venta_usuario);
            obj.put("data", paquete_venta_usuario);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public static void editar(JSONObject obj) {
        try {
            SPGConect.editObject("paquete_venta_usuario", obj);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public void eliminar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject paquete_venta_usuario = obj.getJSONObject("data");
            paquete_venta_usuario.put("estado", 0);
            SPGConect.editObject("paquete_venta_usuario", paquete_venta_usuario);

            
            
            obj.put("data", paquete_venta_usuario);
            obj.put("estado", "exito");
            SSServerAbstract.sendAllServer(obj.toString());
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }

    public void subirFoto(JSONObject obj, SSSessionAbstract session) {
        String url = SConfig.getJSON().getJSONObject("files").getString("url");
        File f = new File(url+"paquete_venta_usuario/");
        if(!f.exists()) f.mkdirs();
        obj.put("dirs", new JSONArray().put(f.getPath()+"/"+obj.getString("key")));
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }
}