<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleSolicitud extends Model
{
    protected $table = 'detalle_solicitud_cotizacion';
    protected $primaryKey = 'id';

    protected $appends = ['productoNombre'];

    public function solicitud()
    {
        return $this->belongsTo('App\Models\SolicitudCotizacion', 'numero_solicitud_de_cotizacion', 'numero');
    }

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