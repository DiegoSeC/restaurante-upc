<?php

namespace App\Repositories;


use App\Models\DetalleCotizacion;

class DAO_DetalleCotizacion
{
    private $model;

    function __construct(DetalleCotizacion $detalleCotizacion)
    {
        $this->model = $detalleCotizacion;
    }

    public function createDetalle($data, $id)
    {
        $detalles = [];

        foreach ($data->get('detalle') as $producto)
        {
            $detalle = new DetalleCotizacion();
            $detalle->numero_de_cotizacion = $id;
            $detalle->idproducto = $producto['idproducto'];
            $detalle->cantidad = $producto['cantidad'];
            $detalle->precio = $producto['precioUnitario'];

            $detalle->save();
            array_push($detalles, $detalle);
        }

        return $detalles;
    }

    public function updateDetalle($data)
    {
        $detalles = [];

        foreach ($data->get('detalle') as $producto)
        {
            $detalle = DetalleCotizacion::find($producto['id']);
            $detalle->precio = $producto['precioUnitario'];

            $detalle->save();
            array_push($detalles, $detalle);
        }

        return $detalles;
    }

    public function findByCotizacion($cotizacionId)
    {
        return $this->model->whereNumeroDeCotizacion($cotizacionId)->get();
    }
}