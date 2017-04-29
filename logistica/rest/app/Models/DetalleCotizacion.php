<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleCotizacion extends Model
{
    protected $table = 'detalle_cotizacion';
    protected $appends = ['productoNombre'];
    public $timestamps = false;

    public function cotizacion()
    {
        return $this->belongsTo('App\Models\Cotizacion', 'numero_de_cotizacion');
    }

    public function producto()
    {
        return $this->belongsTo('App\Models\Producto', 'idproducto');
    }

    public function setUpdatedAt($value)
    {
    }

    public function setCreatedAt($value)
    {
    }

    public function getProductoNombreAttribute()
    {
        $producto = $this->producto();
        return $producto->first()->nombre;
    }
}