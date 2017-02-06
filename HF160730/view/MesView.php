<?php 
    if(empty($_SESSION['user']))
    {
        header("location:./index.php"); 
    }
?>
<table border="1">
<?php
echo "<tr><td>{$data['one']}</td><td>{$data['two']}</td><td>{$data['thr']}</td></tr>";
foreach ($data['data'] as $i=>$vals){
    echo "<tr>";
    foreach ($vals as $val){
        echo "<td>{$val}</td>";
    }
    echo "</tr>";
}
?>
</table>
<div>
<?php 
echo $data['out'];
?>
</div>