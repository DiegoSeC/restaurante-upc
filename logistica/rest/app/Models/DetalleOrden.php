<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleOrden extends Model
{
    protected $table = 'detalle_orden_de_compra';
    public $timestamps = false;

    protected $appends = ['productoNombre'];

    public function producto()
    {
        return $this->belongsTo('App\Models\Producto', 'idproducto');
    }

    public function getProductoNombreAttribute()
    {
        $producto = $this->producto();
        return $producto->first()->nombre;
    }
}