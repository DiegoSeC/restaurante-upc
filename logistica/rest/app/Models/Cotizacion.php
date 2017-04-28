<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cotizacion extends Model
{
    // use SoftDeletes;
    protected $table = 'cotizacion';
    protected $primaryKey = 'numero';
    protected $appends = ['proveedor', 'personal'];

    public function getProveedorAttribute()
    {
        $proveedor = $this->proveedor();
        return $proveedor->first()->nombre;
    }

    public function getPersonalAttribute()
    {
        $personal = $this->personal();
        return $personal->first()->nombres;
    }

    public function proveedor()
    {
        return $this->belongsTo('App\Models\Proveedor', 'idproveedor');
    }

    public function personal()
    {
        return $this->belongsTo('App\Models\Personal', 'idpersonal');
    }

    public function setUpdatedAt($value)
    {
    }

    public function setCreatedAt($value)
    {
    }
}