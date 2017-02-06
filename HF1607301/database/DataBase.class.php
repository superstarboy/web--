<?php
class DataBase{
	private $server;
	private $user;
	private $password;
	private $port;
	private $database;
	private $link;
	private $rs;
	private static $ins = null;
	/*
	 * @初始化配置文件
	*/
	private function __construct($config) {
		if(is_array($config)){
			$this->server   = $config['server'];
			$this->user     = $config['user'];
			$this->password = $config['password'];
			$this->port     = $config['port'];
			$this->database = $config['database'];

			$this->link = mysqli_connect($this->server,$this->user,$this->password,$this->database,$this->port);
		}
		if (!$this->link){
			echo "连接失败：".mysqli_error();
		}else {
			//echo "连接成功";
			mysqli_query($this->link,"SET NAMES 'utf8'");
		}
	}
	/*
	 * @送出单例
	*/
	public static function db_get($config){
		if(is_null(self::$ins)){
			self::$ins = new DataBase($config);
		}
		return self::$ins;
	}
	/*
	 * @执行无结果语句
	*/
	public function mysql_query($sql){
		$this->rs = mysqli_query($this->link,$sql);
		return $this->rs;
	}
	/*
	 * @靠键值送出结果
	*/
	public function mysql_assoc($sql){
		$data = [];
		$this->rs = mysqli_query($this->link,$sql);
		while ($arr = mysqli_fetch_assoc($this->rs)){
			$data[] = $arr;
		}
		return $data;
	}
	/*
	 * @靠下标送出结果
	*/
	public function mysqli_row($sql){
		$data = [];
		$this->rs = mysqli_query($this->link, $sql);
		while ($arr = mysqli_fetch_row($this->rs)){
			$data[] = $arr;
		}
		return $data;
	}
	/*
	 * @禁止克隆单例
	*/
	public function __clone(){
		die("Clone is not allowed".E_USER_ERROR);
	}
	/*
	 * @析构函数，关闭必执行
	*/
	public function __destruct(){
		if(is_resource($this->rs)){
			mysqli_free_result($this->rs);
		}
		mysqli_close($this->link);
	}
}