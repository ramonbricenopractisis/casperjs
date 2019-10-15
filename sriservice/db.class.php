<?php  
//Declaración de la clase 
class DBConn extends PDO{
    public function __construct($dbname){
        //include ('../ips_enoc.php');
        $user = 'practisis3';
        $pass = 'Zuleta99@251!';
        $auxdireccion = isset($auxdireccion) ? $auxdireccion : 0;

        if(!isset($_SESSION)){
            session_start();
        }
        //Archivo de conexión
        include ('ips_enoc.php');
        //Asignando el nombre de la base de datos y el host
        if($dbname == 'administrador_practisis'){
            $host = $ip_real;
        }else if($dbname == 'bd_ideal'){
            $host = $ip_real;
        }else if($dbname == 'weblic'){
            $host = $ip_real;
        }else if($dbname == 'base_template_empresa'){
            $host = $ip_real;
        }else if($auxdireccion == 1){
            $host = base64_decode($sec);
        }else if($auxdireccion == 2){
            $host = $hostd;
        }else{
            $host = $_SESSION['direccion'];
        }
        
        parent::__construct('pgsql: host='.$host.'; dbname='.$dbname, $user, $pass);
        $this -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this -> setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }
}
?>