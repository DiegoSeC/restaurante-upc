<?php

namespace App\Repositories;

use App\Models\OrdenCompra;

class DAO_OrdenCompra
{
    private $model;

    function __construct(OrdenCompra $ordenCompra)
    {
        $this->model = $ordenCompra;
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
            ->orWhere('fecha', 'like', "%{$this->formatDate($q)}%")
            ->orWhereHas('personal', function($sq) use ($q) {
                $sq->where('nombres', 'like', "%$q%");
            })
            ->orWhereHas('proveedor', function($sq) use ($q) {
                $sq->where('nombre', 'like', "%$q%");
            })->get();
    }

    public function createOrden($data)
    {
        $ordenCompra = new OrdenCompra();

        $ordenCompra->fecha = $data->get('fecha');
        $ordenCompra->observacion = $data->get('observacion');
        $ordenCompra->idproveedor = $data->get('idproveedor');
        $ordenCompra->idpersonal = 1;
        $ordenCompra->estado = 'ACTIVO';
        $ordenCompra->fecha_actualizacion = date('Y-m-d');
        $ordenCompra->numero_cotizacion = $data->get('numero_cotizacion');
        $ordenCompra->sede = $data->get('sede');

        $ordenCompra->save();

        return $ordenCompra;
    }

    public function updateOrden($id, $data)
    {
        $ordenCompra = OrdenCompra::find($id);

        $ordenCompra->estado = $data->get('estado');
        $ordenCompra->sede = $data->get('sede');
        $ordenCompra->fecha = $data->get('fecha');
        $ordenCompra->observacion = $data->get('observacion');

        $ordenCompra->save();

        return $ordenCompra;
    }

    public function getById($id)
    {
        return $this->model->find($id);
    }

    private function formatDate($date)
    {
        $_date = explode('/', $date);
        return implode('-', array_reverse($_date));
    }
}