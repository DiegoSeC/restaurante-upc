<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolicitudCotizacion extends Model
{
    protected $table = 'solicitud_de_cotizacion';
    protected $primaryKey = 'numero';

    public function cotizacion()
    {
        return $this->hasMany('App\Models\Cotizacion');
    }

    public function proveedor()
    {
        return $this->belongsTo('App\Models\Proveedor', 'idproveedor');
    }

    public function detalleSolicitud()
    {
        return $this->hasMany('App\Models\DetalleSolicitud');
    }
}