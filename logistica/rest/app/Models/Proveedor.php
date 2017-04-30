<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $table = 'proveedor';

    public function cotizaciones()
    {
        return $this->hasMany('App\Models\Cotizacion');
    }

    public function solicitudes()
    {
        return $this->hasMany('App\Models\SolicitudCotizacion');
    }

    public function ordenes()
    {
        return $this->hasMany('App\Models\OrdenCompra');
    }

    public function setUpdatedAt($value)
    {
    }

    public function setCreatedAt($value)
    {
    }
}