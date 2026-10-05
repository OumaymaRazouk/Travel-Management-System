package org.springdemo.back_travelmanagement_front_office.dto;
public class ReservationRequestDto {
    private Long userId;
    private Long travelId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTravelId() {
        return travelId;
    }

    public void setTravelId(Long travelId) {
        this.travelId = travelId;
    }
}

