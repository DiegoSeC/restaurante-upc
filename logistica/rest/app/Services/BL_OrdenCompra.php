<?php

namespace App\Services;


use App\Repositories\DAO_Cotizacion;
use App\Repositories\DAO_DetalleCotizacion;
use App\Repositories\DAO_DetalleOrden;
use App\Repositories\DAO_OrdenCompra;

class BL_OrdenCompra extends Services
{
    private $repository;
    private $cotizacionRepository;
    private $detalleRepository;
    private $detalleOrdenRepository;

    function __construct(DAO_OrdenCompra $dao,
                         DAO_Cotizacion $cotizacion,
                         DAO_DetalleCotizacion $daoDetalle,
                         DAO_DetalleOrden $daoOrden)
    {
        $this->repository = $dao;
        $this->cotizacionRepository = $cotizacion;
        $this->detalleRepository = $daoDetalle;
        $this->detalleOrdenRepository = $daoOrden;
    }

    public function getOrdenes($q = null)
    {
        if(isset($q)) {
            $cod = false;

            if(strpos($q, 'N17') > -1) {
                $q = (int) substr($q, -4);
                $cod = true;
            }

            return $this->repository->getLikeAll($q, $cod);
        }

        return $this->repository->getAll();
    }

    public function getCotizaciones($q)
    {
        if(strpos($q, 'COT') > -1) {
            $q = (int) substr($q, -4);
        }

        $cotizaciones = $this->cotizacionRepository->searchCotizacion($q);

        foreach ($cotizaciones as &$cotizacion)
        {
            $this->attachDetalle($cotizacion);
        }

        return $cotizaciones;
    }

    public function createOrden($data)
    {
        $ordenCompra = $this->repository->createOrden($data);
        $this->detalleOrdenRepository->createDetalle($ordenCompra->numero, $data);
        return ['success' => true, 'numero' => $ordenCompra->numero];
    }

    public function getOrden($id)
    {
        $orden = $this->repository->getById($id);
        return $this->attachOrdenDetalle($orden);
    }

    public function updateOrden($id, $orden)
    {
        $this->repository->updateOrden($id, $orden);
        $this->detalleOrdenRepository->updateDetalle($orden);
        return ['success' => true, 'numero' => $id];
    }

    private function attachOrdenDetalle($orden)
    {
        $orden->detalle = $this->detalleOrdenRepository->findByOrden($orden->numero);
        return $orden;
    }

    private function attachDetalle($cotizacion)
    {
        $cotizacion->detalle = $this->detalleRepository->findByCotizacion($cotizacion->numero);
        return $cotizacion;
    }

}