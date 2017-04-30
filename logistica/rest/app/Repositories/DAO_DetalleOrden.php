<?php

namespace App\Repositories;


use App\Models\DetalleOrden;

class DAO_DetalleOrden
{
    private $model;

    function __construct(DetalleOrden $detalleOrden)
    {
        $this->model = $detalleOrden;
    }

    public function createDetalle($id, $data)
    {
        $detalles = [];

        foreach ($data->get('detalle') as $producto)
        {
            $detalle = new DetalleOrden();
            $detalle->numero_orden_de_compra = $id;
            $detalle->idproducto = $producto['idproducto'];
            $detalle->cantidad = $producto['cantidad'];
            $detalle->precio = $producto['precio'];

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
            $detalle = DetalleOrden::find($producto['id']);
            $detalle->precio = $producto['precio'];

            $detalle->save();
            array_push($detalles, $detalle);
        }

        return $detalles;
    }

    public function findByOrden($orden)
    {
        return $this->model->whereNumeroOrdenDeCompra($orden)->get();
    }
}