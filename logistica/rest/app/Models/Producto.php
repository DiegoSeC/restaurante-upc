<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'producto';

    public function detalleSolicitud()
    {
        return $this->hasMany('App\Models\DetalleSolicitud');
    }

    public function detalleCotizacion()
    {
        return $this->hasMany('App\Models\DetalleCotizacion');
    }

    public function detalleOrden()
    {
        return $this->hasMany('App\Models\DetalleOrden');
    }

}