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

    public function getLikeAll($q, $cod = false)
    {
        if($cod) {
            return $this->model
                ->where('numero', 'like', "%$q%")
                ->get();
        }

        return $this->model
            ->where('numero', 'like', "%$q%")
            ->orWhere('fecha_de_vencimiento', 'like', "%{$this->formatDate($q)}%")
            ->orWhereHas('personal', function($sq) use ($q) {
                $sq->where('nombres', 'like', "%$q%");
            })
            ->orWhereHas('proveedor', function($sq) use ($q) {
                $sq->where('nombre', 'like', "%$q%");
            })->get();
    }

    public function searchCotizacion($q)
    {
        return $this->model
            ->with('proveedor')
            ->where('numero', 'like', "%$q%")
            ->where('estado', '=', 1)
            ->get();
    }

    public function getById($id)
    {
        return $this->model->find($id);
    }

    public function createCotizacion($data)
    {
        $cotizacion = new Cotizacion();

        $cotizacion->numero_solicitud_de_cotizacion = $data->get('numero_solicitud_de_cotizacion');
        $cotizacion->observacion = $data->get('observacion');
        $cotizacion->fecha_de_vencimiento = $data->get('fecha_de_vencimiento');
        $cotizacion->fecha = date('Y-m-d');
        $cotizacion->fecha_de_actualizacion = date('Y-m-d');
        $cotizacion->estado = 'ACTIVO';
        $cotizacion->idproveedor = $data->get('idproveedor');
        $cotizacion->idpersonal = 1;

        $cotizacion->save();

        return $cotizacion;
    }

    public function updateCotizacion($id, $data)
    {
        $cotizacion = Cotizacion::find($id);

        $cotizacion->observacion = $data->get('observacion');
        $cotizacion->estado = $data->get('estado');

        $cotizacion->save();
        return $cotizacion;
    }

    private function formatDate($date)
    {
        $_date = explode('/', $date);
        return implode('-', array_reverse($_date));
    }
}