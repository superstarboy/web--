<?php
/*
 * @分页处理
 * @传入sql语句(带count计算总页数)，页数，当前页数初始化
 */
class PageModel extends Model{
    private $pagesize;
    private $rowcount;
    private $pagecount;
    private $pagenow;
    private $data;
    private $pagenext;
    private $pageprve;
    public function setPage($sql,$pagenow,$pagesize=5){
        $this->pagesize = $pagesize;
        $data =  $this->db->mysqli_row($sql);
        $this->rowcount = $data[0][0];//记录条数
        $this->pagecount = ceil($this->rowcount/$this->pagesize);//页数
        $this->pagenow = $pagenow;
        $this->pageNext();//提前算好下一页
        $this->pagePrve();//提前算好上一页
    }
    public function pageQuery($sql){
        $offset = ($this->pagenow - 1)*$this->pagesize;
        $sql = $sql." limit {$offset},{$this->pagesize};";
        //echo $sql;
        $this->data = [];
        $this->data['data'] = $this->db->mysql_assoc($sql);
        $this->data['rowcount'] = $this->rowcount;
        $this->data['pagecount'] =$this->pagecount;
        $this->data['pagenow'] = $this->pagenow;
        return $this->data;
    }
    public function pageNext(){
        $this->pagenext = $this->pagenow + 1;
        if($this->pagenext >= $this->pagecount){
            $this->pagenext = $this->pagecount;
        }
    }
    public function pagePrve(){
    	$this->pageprve = $this->pagenow - 1;
    	if($this->pageprve < 1){
    		$this->pageprve = 1;
    	}
    }
    /*
     * @按字符串传出下标
     */
    public function pageOut($url){
        $mes = "共{$this->pagecount}页  共{$this->rowcount}条  当前{$this->pagenow}页 <a href='{$url}&pagenow={$this->pageprve}'>前页</a> <a href='{$url}&pagenow={$this->pagenext}'>次页</a>";
        //echo "共{$this->pagecount}page 共{$this->rowcount}tiao 当前{$this->pagenow}page";
        //echo "<a href='{$url}?pagenow={$this->pagenext}'>next page</a>";
        //echo "<a href='{$url}?pagenow={$this->pageprve}'>prve page</a>";
       return $mes;
    }
}