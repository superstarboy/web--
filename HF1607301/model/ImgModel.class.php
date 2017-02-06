<?php
class ImgModel extends Model{
    public function seleImg(){                  //查找图片路径
        $sql = "SELECT equimg_url FROM equ_img;";
        $data = $this->db->mysql_assoc($sql);
        $sql = "SELECT game_img FROM gamemap;";
        $map = $this->db->mysql_assoc($sql);
        $sql = "SELECT star_url FROM mapstar;";
        $star = $this->db->mysql_assoc($sql);
        for($i=0;$i<count($data);$i++){
            $this->dlfile("http://localhost/HF160730/".$data[$i]['equimg_url'],"./".$data[$i]['equimg_url']);
        }
        for ($i=0;$i<count($map);$i++){
            $this->dlfile("http://localhost/HF160730/".$map[$i]['game_img'],"./".$map[$i]['game_img']);
        }
        for ($i=0;$i<count($map);$i++){
        	$this->dlfile("http://localhost/HF160730/".$star[$i]['star_url'],"./".$star[$i]['star_url']);
        }
    }
    public function dlfile($file_url,$save_to){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POST,0);
        curl_setopt($ch, CURLOPT_URL, $file_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $file_content = curl_exec($ch);
        curl_close($ch);
        $downloaded_file = fopen($save_to, 'w');
        fwrite($downloaded_file, $file_content);
        fclose($downloaded_file);
    }
}