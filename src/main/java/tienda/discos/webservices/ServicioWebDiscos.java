package tienda.discos.webservices;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tienda.discos.servicios.ServicioDiscos;

@Controller
@RestController
@RequestMapping("servicioWebDiscos/")
public class ServicioWebDiscos {
	
	// como pedir una bean de spring cuyo nombre de clase se usa en varios paquetes
	// ej.
	//webservices.ServiciosWEBPedidos
	//webservices.admin.ServiciosWEBPedidos
//	@Autowired
//	@Qualifier("servicioWebAdmin")
//	private ServicioWebDiscos servicioWebDiscos;
	
	@Autowired
	private ServicioDiscos servicioDiscos;
	
	@RequestMapping("obtenerDiscos")
	public List<Map<String, Object>> obtenerDiscos(@RequestParam(name = "nombre", defaultValue = "")String titulo ){
		return servicioDiscos.obtenerDiscosParaFormatJSON(titulo);
	}
	
	@RequestMapping("obtenerDiscoDetalles")
	public Map<String, Object> obtenerDiscosDetalles(@RequestParam("id") Integer id){
		return servicioDiscos.obtenerDetallesDisco(id);
	}
}