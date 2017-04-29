<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cotizacion extends Model
{
    // use SoftDeletes;
    protected $table = 'cotizacion';
    protected $primaryKey = 'numero';
    protected $with = ['proveedor', 'personal'];
    public $timestamps = false;

    public function setEstadoAttribute($value)
    {
        $this->attributes['estado'] = $value === 'ACTIVO' ? 1 : 2;
    }

    public function getEstadoAttribute($value)
    {
        return $value === 1 ? 'ACTIVO' : 'INACTIVO';
    }

    public function proveedor()
    {
        return $this->belongsTo('App\Models\Proveedor', 'idproveedor');
    }

    public function personal()
    {
        return $this->belongsTo('App\Models\Personal', 'idpersonal');
    }

    public function solicitud()
    {
        return $this->belongsTo('App\Models\SolicitudCotizacion', 'numero_solicitud_de_cotizacion');
    }

    public function detalle()
    {
        return $this->hasMany('App\Models\DetalleCotizacion');
    }

    public function setUpdatedAt($value)
    {
    }

    public function setCreatedAt($value)
    {
    }
}