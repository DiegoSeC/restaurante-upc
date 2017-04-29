<?php

namespace App\Repositories;

use App\Models\SolicitudCotizacion;

class DAO_SolicitudCotizacion
{
    private $model;

    function __construct(SolicitudCotizacion $solicitudCotizacion)
    {
        $this->model = $solicitudCotizacion;
    }

    function getAll()
    {
        return $this->model->with(['proveedor' => function($q) {
            $q->select('ruc', 'nombre', 'id');
        }])->get();
    }

    public function getLikeAll($q)
    {
        return $this->model
            ->with(['proveedor' => function($q) {
                $q->select('ruc', 'nombre', 'id');
            }])
            ->where('numero', 'like', "%$q%")
            ->orWhere('fecha', 'like', "%{$this->formatDate($q)}%")
            ->orWhereHas('proveedor', function($sq) use ($q) {
                $sq->where('nombre', 'like', "%$q%")->orWhere('ruc', 'like', "%$q%");
            })->get();
    }

    private function formatDate($date)
    {
        $_date = explode('/', $date);
        return implode('-', array_reverse($_date));
    }
}