// import { DateTime } from 'luxon';
import { PropsWithChildren } from 'react';
import { Row, Col, Badge } from 'reactstrap';
import { IResearch } from './IResearch';
import { Style } from '../common/Style';
import { HrefTargetBlank } from '../common';

// import Util from '../common/Util';

export default function ResearchRow({
  item,
  index,
}: PropsWithChildren<{ item: IResearch.Item; index: number }>) {
  return (
    <div>
      {index > 0 ? <hr /> : ''}
      <Row>
        <Col sm={12} md={3} className="text-md-right">
          {createWorkingPeriod(
            item.type,
            item.firstauthor,
            item.coauthor,
            item.planned,
            item.review,
          )}
        </Col>
        <Col sm={12} md={9}>
          <h6>{item.title}</h6>
          {item.subTitle ? (
            <i style={Style.gray}>
              {item.subTitle}
              <br />
            </i>
          ) : (
            ' '
          )}
          {item.author ? <i style={Style.gray}>{item.author}</i> : ' '}
          <ul className="pt-3">
            {item.descriptions.map((description, descIndex) => (
              <li key={descIndex.toString()}>{description}</li>
            ))}
            {createSkillKeywords(item.skillKeywords)}
          </ul>
          {item.link ? (
            <i style={Style.black}>
              코드 및 상세설명 : <HrefTargetBlank url={item.link} text={item.link} />
            </i>
          ) : (
            ''
          )}
        </Col>
      </Row>
    </div>
  );
}

function createSkillKeywords(skillKeywords?: string[]) {
  if (!skillKeywords) {
    return '';
  }
  return (
    <li>
      <div>
        {skillKeywords.map((keyword, index) => (
          <Badge
            style={Style.skillKeywordBadge}
            key={index.toString()}
            color="secondary"
            className="mr-1"
          >
            {keyword}
          </Badge>
        ))}
      </div>
    </li>
  );
}

function createWorkingPeriod(
  itemtype: string,
  firstauthor?: string,
  coauthor?: string,
  planned?: string,
  review?: string,
) {
  return (
    <Row>
      <Col md={12} xs={9}>
        <h4 style={Style.gray}>{itemtype}</h4>
      </Col>
      <Col md={12} xs={3} className="text-md-right text-center">
        {firstauthor ? <Badge color="primary">1저자 : {firstauthor}</Badge> : ''}
        {coauthor ? <Badge color="dark">공저자 : {coauthor}</Badge> : ''}
        {review ? <Badge color="warning">심사중 : {review}</Badge> : ''}
        {planned ? <Badge color="secondary">계획 : {planned}</Badge> : ''}
      </Col>
    </Row>
  );
}
