<?php
//上传处理界面
class UploadModel extends Model{
	public function getFile($name,$src){
			$_FILES[$name];//二维数组  FILES里面的是根据input里面的name属性
			if(!file_exists($src)){//=============判定有无传输目录
				mkdir($src);
			}
			$path=$src."/".$_FILES[$name]['name'];
			move_uploaded_file($_FILES[$name]['tmp_name'], $path);
			if($_FILES[$name]['error'] > 0)
			{
				return false;
			}
			else
			{
				return $path;
			}
	}
}