<?php
/*
 * @工厂核心，加载所有目录,单例
 */
class Factory{
	private  static $int=null;
	public static function getInterface(){
		if(self::$int == null){
			self::$int = new Factory();
		}
		return self::$int;
	}
    private function __construct(){
    	$GLOBALS['ROOT_PATH'] = getcwd();
    	
    	require_once $GLOBALS['ROOT_PATH'].'/database/DataBase.class.php';
    	$GLOBALS['config'] = include $GLOBALS['ROOT_PATH'].'/database/config.php';
    	
        require_once $GLOBALS['ROOT_PATH'].'/core/Model.class.php';
        require_once $GLOBALS['ROOT_PATH'].'/core/Control.class.php';
        

        spl_autoload_register(array(__CLASS__,'loadControl'));
        spl_autoload_register(array(__CLASS__,'loadModel'));
        session_start();
    
    }
    public function loadControl($classname){
    	$filename = $GLOBALS['ROOT_PATH']."/control/".$classname.".class.php";
    	if(file_exists($filename)){
                require_once $filename;
            }
    }
    public function loadModel($classname){
    	$filename = $GLOBALS['ROOT_PATH']."/model/".$classname.".class.php";
    	if(file_exists($filename)){
    		require_once $filename;
    	}
    }
    public function run(){
        isset($_GET['c'])?$c=$_GET['c']:$c='Login';
        $controlname = $c."Control";
        $contrl = new $controlname();
        if($contrl instanceof Control){
            $contrl->doAction();
        }
    }
//     public function run(){
//         isset($_GET['c'])?$c=$_GET['c']:$c='Cut';
//         $controlname = $c."Control";
//         $contrl = new $controlname();
//         if($contrl instanceof Control){
//             $contrl->doAction();
//         }
//     }
}
?>