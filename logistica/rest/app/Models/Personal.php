<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    protected $table = 'personal';

    public function setUpdatedAt($value)
    {
    }

    public function setCreatedAt($value)
    {
    }

    public function cotizaciones()
    {
        return $this->hasMany('App\Models\Cotizacion');
    }

    public function ordenes()
    {
        return $this->hasMany('App\Models\OrdenCompra');
    }
}