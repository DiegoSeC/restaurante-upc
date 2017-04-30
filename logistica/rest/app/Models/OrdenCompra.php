<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrdenCompra extends Model
{
    protected $table = 'orden_de_compra';
    protected $primaryKey = 'numero';
    public $timestamps = false;
    protected $with = ['proveedor', 'personal'];

    public function proveedor()
    {
        return $this->belongsTo('App\Models\Proveedor', 'idproveedor');
    }

    public function personal()
    {
        return $this->belongsTo('App\Models\Personal', 'idpersonal');
    }

    public function setEstadoAttribute($value)
    {
        $estado = 1;

        switch ($value) {
            case 'POR APROBAR': $estado = 2; break;
            case 'ATENDIDA': $estado = 3; break;
            case 'ELIMINADA': $estado = 4; break;
        }

        $this->attributes['estado'] = $estado;
    }

    public function getEstadoAttribute($value)
    {
        $estado = 'PENDIENTE';

        switch ($value) {
            case 2: $estado = 'POR APROBAR'; break;
            case 3: $estado = 'ATENDIDA'; break;
            case 4: $estado = 'ELIMINADA'; break;
        }

        return $estado;
    }
}