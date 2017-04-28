<?php

namespace App\Repositories;

use App\Models\Cotizacion;

class DAO_Cotizacion
{
    private $model;

    public function __construct(Cotizacion $cotizacion)
    {
        $this->model = $cotizacion;
    }

    public function getAll()
    {
        return $this->model->all();
    }

    public function getLikeAll($q)
    {
        return $this->model
            ->where('numero', 'like', "%$q%")
            ->orWhere('fecha_de_vencimiento', 'like', "%$q%")
            ->orWhereHas('personal', function($sq) use ($q) {
                $sq->where('nombres', 'like', "%$q%");
            })
            ->orWhereHas('proveedor', function($sq) use ($q) {
                $sq->where('nombre', 'like', "%$q%");
            })->get();
    }
}